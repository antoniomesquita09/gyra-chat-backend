/* eslint-disable no-console */
import express from 'express';
import http from 'http';
import httpStatus from 'http-status';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';

import schema from '~/graphql/schema';
import APIError from '~/errors/api-error';
import config from './config';

// create apollo server
const server = new ApolloServer({
  schema,
  subscriptions: {
    onConnect: () => console.info('✅ Connected to websocket'),
    onDisconnect: () => console.info('Disconnect from websocket'),
  },
});

// create express app
const app = express();

// trust proxy true
app.set('trust proxy', true);

// remove x-powered-by header
app.disable('x-powered-by');

// secure apps by setting various HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: config.nodeEnv === 'production' ? undefined : false,
  })
);

app.use(morgan('common'));

// apply apollo middlleware
server.applyMiddleware({
  app,
  cors: true,
  tracing: true,
  playground: config.nodeEnv === 'development',
  onHealthCheck: () =>
    // eslint-disable-next-line no-undef
    new Promise((resolve, reject) => {
      if (mongoose.connection.readyState > 0) {
        resolve();
      } else {
        reject();
      }
    }),
});

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    const error = new APIError('Invalid token.', httpStatus.UNAUTHORIZED, true);
    return next(error);
  }

  if (!(err instanceof APIError)) {
    const error = new APIError(err.message, err.status);
    return next(error);
  }

  return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new APIError('Endpoint not found.', httpStatus.NOT_FOUND, true);
  return next(error);
});

// error handler, send stacktrace only during development
app.use((
  err,
  req,
  res,
  next // eslint-disable-line no-unused-vars
) =>
  res.status(err.status).json({
    message: err.message,
    stack: config.nodeEnv === 'development' ? err.stack : {},
  })
);

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

export default httpServer;

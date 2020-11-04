/* eslint-disable no-console */
import config from '~/core/config'; // eslint-disable-line import/order

import util from 'util';
import debug from 'debug';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import asciify from 'asciify-image';
/* eslint-disable import/first */

import app from '~/core/express';
import APIError from '~/errors/api-error';

// connect to mongo db
mongoose.connection.openUri(config.mongodbUri, {
  autoIndex: true,
  poolSize: 50,
  bufferMaxEntries: 0,
  keepAlive: 120,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => console.info('Mongoose connected.'));

mongoose.connection.on('error', (err) => {
  throw new APIError(
    `Mongoose connection error: ${err}`,
    httpStatus.INTERNAL_SERVER_ERROR
  );
});

mongoose.connection.on('disconnected', () =>
  console.info('Mongoose disconnected.')
);

// print mongoose logs in dev env
if (config.mongooseDebug) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    const indexDebug = debug('gyra-chat-backend:index');
    indexDebug(
      `${collectionName}.${method}`,
      util.inspect(query, false, 20),
      doc
    );
  });
}

const gracefulShutdown = (reason, callback) =>
  mongoose.connection.close(() => {
    console.info(`Mongoose closed through ${reason}.`);
    callback();
  });

// For nodemon restarts
process.once('SIGUSR2', () =>
  gracefulShutdown('nodemon restart', () =>
    process.kill(process.pid, 'SIGUSR2')
  )
);

// For app termination
process.on('SIGINT', () =>
  gracefulShutdown('app termination', () => process.exit(0))
);

// For environment app termination
process.on('SIGTERM', () =>
  gracefulShutdown('environment app termination', () => process.exit(0))
);

// listen on port config.port
app.listen(config.port, async () => {
  console.info(`✅ Server started on port ${config.port} (${config.nodeEnv}).`);

  try {
    const asciified = await asciify('./src/images/baracktocat.jpg', {
      fit: 'box',
      width: 25,
      height: 25,
    });

    console.log(asciified);
  } catch (e) {
    console.log(`Asciify error: ${e.message}`);
  }
});

export default app;

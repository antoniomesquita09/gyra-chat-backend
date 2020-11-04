import Joi from 'joi';
import dotenv from 'dotenv';

// configure dotenv, will load vars in .env in PROCESS.ENV
dotenv.config();

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  PORT: Joi.number().required().description('App port'),
  MONGODB_URI: Joi.string().required().description('MongoDB uri'),
  MONGOOSE_DEBUG: Joi.boolean().when('NODE_ENV', {
    is: Joi.string().equal('development'),
    then: Joi.boolean().default(true),
    otherwise: Joi.boolean().default(false),
  }),
})
  .unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  nodeEnv: envVars.NODE_ENV,
  port: envVars.PORT,
  mongodbUri: envVars.MONGODB_URI,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
};

export default config;

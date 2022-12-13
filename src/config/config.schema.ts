import Joi from 'joi';

const validEnv = ['development', 'test', 'production'];

export const schema = Joi.object({
  APP_ENV: Joi.string()
    .valid(...validEnv)
    .default('development'),
  APP_NAME: Joi.string().required(),
  APP_PORT: Joi.number().default(3000),
  APP_URL: Joi.string().required(),
  KEYCLOAK_AUTH_SERVER_URL: Joi.string().required(),
  KEYCLOAK_REALM: Joi.string().required(),
  KEYCLOAK_CLIENT_ID: Joi.string().required(),
  KEYCLOAK_SECRET: Joi.string().required(),
  KEYCLOAK_GRANT_TYPE: Joi.string().required(),
  KEYCLOAK_REDIRECT_URI: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  ROLE_0: Joi.string().required(),
  ROLE_1: Joi.string().required(),
  MINIO_ENDPOINT: Joi.string().required(),
  MINIO_PORT: Joi.number().required(),
  MINIO_USE_SSL: Joi.string().required(),
  MINIO_ACCESS_KEY: Joi.string().required(),
  MINIO_SECRET_KEY: Joi.string().required(),
  MINIO_BUCKET_NAME: Joi.string().required(),
  TEST_KEYCLOAK_AUTH_URI: Joi.string().required(),
  TEST_USER_USERNAME: Joi.string().required(),
  TEST_USER_PASSWORD: Joi.string().required(),
});

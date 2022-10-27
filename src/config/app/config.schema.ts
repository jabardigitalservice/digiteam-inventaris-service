import Joi from 'joi';

export const schema = Joi.object({
  app: Joi.object({
    env: Joi.string().valid('development', 'production').default('development'),
    name: Joi.string().required(),
    url: Joi.string().required(),
    port: Joi.number().default(3000),
  }),
  keycloak: Joi.object({
    authServer: Joi.string().required(),
    realm: Joi.string().required(),
    clientId: Joi.string().required(),
    secret: Joi.string().required(),
  }),
  mysql: Joi.object({
    host: Joi.string().required(),
    port: Joi.number().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    database: Joi.string().required(),
  }),
  roles: {
    role0: Joi.string().required(),
    role1: Joi.string().required(),
  },
  minio: {
    endPoint: Joi.string().required(),
    port: Joi.number().required(),
    useSSL: Joi.string().required(),
    accessKey: Joi.string().required(),
    secretKey: Joi.string().required(),
    bucketName: Joi.string().required(),
  },
});

import { config } from 'dotenv';
import { convertToBoolean } from '../common/helpers/convert';

config();

export default () => ({
  app: {
    env: process.env.APP_ENV,
    name: process.env.APP_NAME,
    url: process.env.APP_URL,
    port: parseInt(process.env.APP_PORT) || 3000,
  },
  keycloak: {
    authServer: process.env.KEYCLOAK_AUTH_SERVER_URL,
    realm: process.env.KEYCLOAK_REALM,
    clientId: process.env.KEYCLOAK_CLIENT_ID,
    secret: process.env.KEYCLOAK_SECRET,
  },
  mysql: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  roles: {
    role0: process.env.ROLE_0,
    role1: process.env.ROLE_1,
  },
  minio: {
    endPoint: process.env.MINIO_ENDPOINT,
    port: parseInt(process.env.MINIO_PORT),
    useSSL: convertToBoolean(process.env.MINIO_USE_SSL),
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
    bucketName: process.env.MINIO_BUCKET_NAME,
  },
});

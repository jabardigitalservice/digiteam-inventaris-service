import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  APP_ENV: process.env.APP_ENV,
  APP_NAME: process.env.APP_NAME,
  APP_URL: process.env.APP_URL,
  APP_PORT: process.env.APP_PORT,
  KEYCLOAK_AUTH_SERVER_URL: process.env.KEYCLOAK_AUTH_SERVER_URL,
  KEYCLOAK_REALM: process.env.KEYCLOAK_REALM,
  KEYCLOAK_CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID,
  KEYCLOAK_SECRET: process.env.KEYCLOAK_SECRET,
}));

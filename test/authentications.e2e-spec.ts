import { INestApplication, HttpStatus } from '@nestjs/common';
import request from 'supertest';
import 'jest-extended';
import { config } from 'dotenv';
import axios from 'axios';
import qs from 'qs';
import bootstrap from '../src/main';

config();

jest.setTimeout(10000);

let accessToken: string;

export const getAccessToken = async (username: string, password: string) => {
  try {
    const data = qs.stringify({
      username,
      password,
      client_id: process.env.KEYCLOAK_CLIENT_ID,
      redirect_uri: process.env.KEYCLOAK_REDIRECT_URI,
      grant_type: process.env.KEYCLOAK_GRANT_TYPE,
      client_secret: process.env.KEYCLOAK_SECRET,
    });

    const config = {
      method: 'post',
      url: process.env.TEST_KEYCLOAK_AUTH_URI,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    };

    const response = await axios(config);

    const accessToken = response.data.access_token;
    return accessToken;
  } catch (error) {
    throw new Error(error);
  }
};

describe('AuthenticationsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await bootstrap;

    accessToken = await getAccessToken(
      process.env.TEST_USER_USERNAME,
      process.env.TEST_USER_PASSWORD,
    );
  });

  afterAll(async () => {
    await app.close();
  });

  describe('getProfile', () => {
    it('(GET) /authentications/profile Unauthorized', () => {
      request(app.getHttpServer())
        .get('/authentications/profile')
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('(GET) /authentications/profile', () => {
      request(app.getHttpServer())
        .get('/authentications/profile')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(HttpStatus.OK);
    });
  });
});

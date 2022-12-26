import { INestApplication, HttpStatus } from '@nestjs/common';
import request from 'supertest';
import 'jest-extended';
import axios from 'axios';
import qs from 'qs';
import bootstrap from '../src/main';
import { ConfigService } from '@nestjs/config';

jest.setTimeout(10000);

let accessToken: string;

export const getAccessToken = async (configService: ConfigService) => {
  try {
    const data = qs.stringify({
      username: configService.get('keycloak.testUsername'),
      password: configService.get('keycloak.testPassword'),
      client_id: configService.get('keycloak.clientId'),
      client_secret: configService.get('keycloak.secret'),
      grant_type: configService.get('keycloak.grantType'),
      redirect_uri: configService.get('keycloak.redirectUri'),
    });

    const config = {
      method: 'post',
      url: configService.get('keycloak.testAuthUri'),
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

    const configService: ConfigService = app.get(ConfigService);

    accessToken = await getAccessToken(configService);
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

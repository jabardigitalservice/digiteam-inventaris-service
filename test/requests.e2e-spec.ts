import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import request from 'supertest';
import 'jest-extended';
import { config } from 'dotenv';
import axios from 'axios';
import qs from 'qs';
import { Create } from '../src/modules/requests/requests.interface';
import faker from 'faker';

config();

let accessToken: string;
let requestId: string;

const getAccessToken = async (username: string, password: string) => {
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

const validOneOf = [null, expect.any(String)];

const itemExpectation = expect.objectContaining({
  id: expect.any(String),
  email: expect.any(String),
  username: expect.any(String),
  division: expect.any(String),
  phone_number: expect.any(String),
  request_type: expect.any(Number),
  replacement_evidence: expect.toBeOneOf(validOneOf),
  requested_item: expect.any(String),
  filename: expect.toBeOneOf(validOneOf),
  item_name: expect.toBeOneOf(validOneOf),
  item_brand: expect.toBeOneOf(validOneOf),
  item_number: expect.toBeOneOf(validOneOf),
  purpose: expect.any(String),
  priority: expect.any(Number),
  status: expect.any(Number),
  notes: expect.toBeOneOf(validOneOf),
  pickup_date: expect.toBeOneOf(validOneOf),
  pickup_signing: expect.toBeOneOf(validOneOf),
  pickup_evidence: expect.toBeOneOf(validOneOf),
  pickup_bast: expect.toBeOneOf(validOneOf),
  created_at: expect.any(String),
  updated_at: expect.any(String),
  deleted_at: expect.toBeOneOf(validOneOf),
});

const metaExpectation = expect.objectContaining({
  page: expect.any(Number),
  from: expect.any(Number),
  to: expect.any(Number),
  last_page: expect.any(Number),
  limit: expect.any(Number),
  total: expect.any(Number),
});

const findAllExpectation = expect.objectContaining({
  data: expect.arrayContaining([itemExpectation]),
  meta: metaExpectation,
});

const findByIdExpectation = expect.objectContaining({
  data: itemExpectation,
  meta: {},
});

const replacement_evidence = faker.image.avatar();

const newRequest: Create = {
  division: 'ITDEV',
  phone_number: faker.phone.phoneNumber(),
  request_type: 1,
  requested_item: 'Laptop',
  purpose: 'Kebutuhan Meeting 2',
  priority: 1,
};

const newRequestWithEvidence = (requestType: number): Create => {
  return {
    ...newRequest,
    request_type: requestType,
    replacement_evidence,
  };
};

const update = {
  status: 2,
  notes: faker.lorem.lines(),
};

let app: INestApplication;

beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
});

describe('RequestsController for User (e2e)', () => {
  beforeEach(async () => {
    accessToken = await getAccessToken(
      process.env.TEST_USER_USERNAME,
      process.env.TEST_USER_PASSWORD,
    );
  });

  describe('findAll', () => {
    it('(GET) /requests Unauthorized', async () => {
      request(app.getHttpServer())
        .get('/requests')
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('(GET) /requests admin Authorization', async () => {
      request(app.getHttpServer())
        .get('/requests')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(HttpStatus.OK)
        .then((res) => {
          const [item] = res.body.data;
          requestId = item.id;
          expect(res.body).toEqual(findAllExpectation);
        });
    });
  });

  describe('findById', () => {
    it('(GET) /requests/:id Unauthorized', async () => {
      request(app.getHttpServer())
        .get('/requests/123abcd')
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('(GET) /requests/:id Not Found', async () => {
      request(app.getHttpServer())
        .get(`/requests/123abcd`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(HttpStatus.NOT_FOUND);
    });

    it('(GET) /requests/:id', async () => {
      request(app.getHttpServer())
        .get(`/requests/${requestId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(HttpStatus.OK)
        .then((res) => {
          expect(res.body).toEqual(findByIdExpectation);
        });
    });
  });

  describe('create', () => {
    it('(POST /requests Unauthorized', async () => {
      request(app.getHttpServer())
        .post('/requests')
        .send(newRequest)
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('(POST) /request without replacement_evidence', async () => {
      request(app.getHttpServer())
        .post('/requests')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(HttpStatus.CREATED);
    });

    it('(POST) /request with invalid request_type for replacement_evidence ', async () => {
      request(app.getHttpServer())
        .post('/requests')
        .send(newRequestWithEvidence(1))
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    it('(POST) /request with valid request_type for replacement_evidence ', async () => {
      request(app.getHttpServer())
        .post('/requests')
        .send(newRequestWithEvidence(2))
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(HttpStatus.CREATED);
    });
  });

  describe('update', () => {
    it('(PUT /requests/:id Unauthorized', async () => {
      request(app.getHttpServer())
        .put(`/requests/${requestId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(update)
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });
});

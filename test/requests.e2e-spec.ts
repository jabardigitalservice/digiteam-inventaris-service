import { INestApplication, HttpStatus } from '@nestjs/common';
import request from 'supertest';
import 'jest-extended';
import { Create } from '../src/modules/requests/requests.interface';
import bootstrap from '../src/main';
import { getAccessToken } from './authentications.e2e-spec';
import { ConfigService } from '@nestjs/config';

jest.setTimeout(10000);

let accessToken: string;
let requestId: string;

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

const replacement_evidence = 'https://test.png';

const newRequest: Create = {
  division: 'ITDEV',
  phone_number: '000000000000',
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

const storeExpectation = expect.objectContaining({
  message: expect.stringContaining('CREATED'),
});

const updateExpectation = expect.objectContaining({
  message: expect.stringContaining('UPDATED'),
});

const update = {
  status: 2,
  notes: 'this is notes',
};

describe('RequestsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await bootstrap;

    const configService: ConfigService = app.get(ConfigService);

    accessToken = await getAccessToken(configService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('findAll', () => {
    it('(GET) /requests Unauthorized', () => {
      request(app.getHttpServer())
        .get('/requests')
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('(GET) /requests Authorization', () => {
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
    it('(GET) /requests/:id Unauthorized', () => {
      request(app.getHttpServer())
        .get('/requests/123abcd')
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('(GET) /requests/:id Not Found', () => {
      request(app.getHttpServer())
        .get('/requests/123abcd')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(HttpStatus.NOT_FOUND);
    });

    it('(GET) /requests/:id', () => {
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
    it('(POST /requests Unauthorized', () => {
      request(app.getHttpServer())
        .post('/requests')
        .send(newRequest)
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('(POST) /request without replacement_evidence', () => {
      request(app.getHttpServer())
        .post('/requests')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(newRequest)
        .expect(HttpStatus.CREATED)
        .then((res) => {
          expect(res.body).toEqual(storeExpectation);
        });
    });

    it('(POST) /request with invalid request_type for replacement_evidence ', () => {
      request(app.getHttpServer())
        .post('/requests')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(newRequestWithEvidence(1))
        .expect(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    it('(POST) /request with valid request_type for replacement_evidence ', () => {
      request(app.getHttpServer())
        .post('/requests')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(newRequestWithEvidence(2))
        .expect(HttpStatus.CREATED)
        .then((res) => {
          expect(res.body).toEqual(storeExpectation);
        });
    });
  });

  describe('update', () => {
    it('(PUT) /requests/:id Unauthorized', () => {
      request(app.getHttpServer())
        .put(`/requests/${requestId}`)
        .send(update)
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('(PUT) /requests/:id Not Found', () => {
      request(app.getHttpServer())
        .put('/requests/123abcd')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(update)
        .expect(HttpStatus.NOT_FOUND);
    });

    it('(PUT) /requests/:id with invalid notes for case rejected', () => {
      request(app.getHttpServer())
        .put(`/requests/${requestId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ status: 2 })
        .expect(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    it('(PUT) /requests/:id with invalid notes for case rejected', () => {
      request(app.getHttpServer())
        .put(`/requests/${requestId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(update)
        .expect(HttpStatus.OK)
        .then((res) => {
          expect(res.body).toEqual(updateExpectation);
        });
    });
  });
});

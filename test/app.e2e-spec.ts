import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Movements Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  it('/POST movements/validation', async () => {
    const response = await request(app.getHttpServer())
      .post('/movements/validation')
      .send({
        movements: [],
        balances: [
          { date: '2023-08-01', balance: 100 },
          { date: '2023-09-01', balance: 100 },
        ],
      });
    expect(response.status).toEqual(202);
    expect(response.body.message).toEqual('Accepted');
  });

  it('/POST movements/validation', async () => {
    const response = await request(app.getHttpServer())
      .post('/movements/validation')
      .send({
        movements: 'Coucou',
        balances: 64,
      });
    expect(response.status).toEqual(400);
  });

  it('/POST movements/validation', async () => {
    const response = await request(app.getHttpServer())
      .post('/movements/validation')
      .send({
        movements: [
          { id: 1, date: '2023-08-20', wording: 'Salade', amount: -20 },
          { id: 3, date: '2023-08-23', wording: 'Oignons', amount: -20 },
          { id: 2, date: '2023-08-21', wording: 'Tomates', amount: -20 },
        ],
        balances: [
          { date: '2023-08-01', balance: 100 },
          { date: '2023-09-01', balance: 100 },
        ],
      });
    expect(response.status).toEqual(418);
    expect(response.body.reason).toBeDefined();
    expect(response.body.reason.invalidPeriods).toBeDefined();
  });
});

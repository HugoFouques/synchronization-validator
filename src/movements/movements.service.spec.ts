import { Test, TestingModule } from '@nestjs/testing';
import { MovementValidationService } from './movements.service';
import { MovementDto } from './dto/movement.dto';
import { BalanceDto } from './dto/balance.dto';

describe('MovementValidationService', () => {
  let service: MovementValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovementValidationService],
    }).compile();

    service = module.get<MovementValidationService>(MovementValidationService);
  });

  test('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('should validate data successfully', () => {
    const movements: MovementDto[] = augMovements;
    const balances: BalanceDto[] = [augBalance, sepBalance];

    const periodValidation = service.validation({ movements, balances });

    expect(periodValidation.every((p) => p.isValid)).toBeTruthy();
  });

  test('should validate data successfully with multiple balances', () => {
    const movements: MovementDto[] = augMovements;
    const balances: BalanceDto[] = [julBalance, augBalance, sepBalance];

    const periodValidation = service.validation({ movements, balances });

    expect(periodValidation.every((p) => p.isValid)).toBeTruthy();
  });

  test('should validate data with multiple balances and movements', () => {
    const movements: MovementDto[] = [...augMovements, ...sepMovements];
    const balances: BalanceDto[] = [augBalance, sepBalance, octBalance];

    const periodValidation = service.validation({ movements, balances });

    expect(periodValidation.every((p) => p.isValid)).toBeTruthy();
  });

  test('should invalidate when missing movements', () => {
    const movements: MovementDto[] = augMovements;
    const balances: BalanceDto[] = [augBalance, sepBalance, octBalance];

    const periodValidation = service.validation({ movements, balances });

    expect(periodValidation.every((p) => p.isValid)).not.toBeTruthy();
  });

  test('should invalidate when incorrect balance', () => {
    const movements: MovementDto[] = [...augMovements, ...sepMovements];
    const balances: BalanceDto[] = [augBalance, sepBalance, novBalance];

    const periodValidation = service.validation({ movements, balances });

    expect(periodValidation.every((p) => p.isValid)).not.toBeTruthy();
  });
});

const augMovements: MovementDto[] = [
  { id: 1, date: new Date('2023-08-20'), wording: 'Salade', amount: -20 },
  { id: 3, date: new Date('2023-08-23'), wording: 'Oignons', amount: -20 },
  { id: 2, date: new Date('2023-08-21'), wording: 'Tomates', amount: -20 },
];

const sepMovements: MovementDto[] = [
  { id: 1, date: new Date('2023-09-20'), wording: 'Tom', amount: 100 },
  { id: 3, date: new Date('2023-09-23'), wording: 'Jerry', amount: -120 },
  { id: 2, date: new Date('2023-09-21'), wording: 'Spike', amount: 10 },
];

const julBalance: BalanceDto = { date: new Date('2023-07-01'), balance: 100 };
const augBalance: BalanceDto = { date: new Date('2023-08-01'), balance: 100 };
const sepBalance: BalanceDto = { date: new Date('2023-09-01'), balance: 40 };
const octBalance: BalanceDto = { date: new Date('2023-10-01'), balance: 30 };
const novBalance: BalanceDto = { date: new Date('2023-11-01'), balance: 60 };
const decBalance: BalanceDto = { date: new Date('2023-12-01'), balance: 60 };

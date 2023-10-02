import { MovementDto } from './movement.dto';

export class PeriodValidationDto {
  startDate: Date;
  endDate: Date;
  startAmount: number;
  endAmount: number;
  isValid: boolean;
  relatedMovements: MovementDto[];
}

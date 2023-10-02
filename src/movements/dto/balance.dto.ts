import { IsNumber, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class BalanceDto {
  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsNumber()
  balance: number;
}

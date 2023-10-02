import { IsString, IsNumber, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class MovementDto {
  @IsNumber()
  id: number;

  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsString()
  wording: string;

  @IsNumber()
  amount: number;
}

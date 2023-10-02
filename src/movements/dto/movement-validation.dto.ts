import { MovementDto } from './movement.dto';
import { BalanceDto } from './balance.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class MovementsValidationDto {
  @ValidateNested({ each: true })
  @Type(() => MovementDto)
  movements: MovementDto[];

  @ValidateNested({ each: true })
  @Type(() => BalanceDto)
  balances: BalanceDto[];
}

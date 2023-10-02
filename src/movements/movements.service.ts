import { Injectable } from '@nestjs/common';
import { MovementsValidationDto } from './dto/movement-validation.dto';
import { MovementDto } from './dto/movement.dto';
import { BalanceDto } from './dto/balance.dto';
import { PeriodValidationDto } from './dto/period-validation.dto';

@Injectable()
export class MovementValidationService {
  validation({
    movements,
    balances,
  }: MovementsValidationDto): PeriodValidationDto[] {
    const sortedBalances = balances.sort(
      (bal1, bal2) => bal1.date.getTime() - bal2.date.getTime(),
    );

    return evaluatedBalancePeriods(movements, sortedBalances);
  }
}

const evaluatedBalancePeriods = (
  movements: MovementDto[],
  sortedBalances: BalanceDto[],
): PeriodValidationDto[] => {
  const evaluatedPeriods = sortedBalances.map((cur, index) => {
    const previous = sortedBalances[index - 1];

    if (!previous) {
      return {
        startDate: cur.date,
        endDate: cur.date,
        startAmount: cur.balance,
        endAmount: cur.balance,
        isValid: true,
        relatedMovements: [],
      };
    }

    const relatedMovements = movements.filter(
      (m) => previous.date < m.date && m.date < cur.date,
    );

    const amountSum = relatedMovements.reduce(
      (balance, currentMov) => balance + currentMov.amount,
      previous.balance,
    );

    return {
      startDate: previous.date,
      endDate: cur.date,
      isValid: amountSum === cur.balance,
      startAmount: previous.balance,
      endAmount: cur.balance,
      relatedMovements,
    };
  });

  return evaluatedPeriods;
};

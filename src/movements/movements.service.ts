import { Injectable } from '@nestjs/common';
import { MovementsValidationDto } from './dto/movement-validation.dto';

@Injectable()
export class MovementValidationService {
  validation({ movements, balances }: MovementsValidationDto): boolean {
    const sortedBalances = balances.sort(
      (bal1, bal2) => bal1.date.getTime() - bal2.date.getTime(),
    );

    const res = sortedBalances.map((cur, index) => {
      const previous = balances[index - 1];

      if (!previous) {
        return true;
      }

      const relatedMovements = movements.filter(
        (m) => previous.date < m.date && m.date < cur.date,
      );

      const amountSum = relatedMovements.reduce(
        (balance, currentMov) => balance + currentMov.amount,
        previous.balance,
      );

      return amountSum === cur.balance;
    });

    return res.every((e) => e === true);
  }
}

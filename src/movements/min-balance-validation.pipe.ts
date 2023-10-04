import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { MovementsValidationDto } from './dto/movement-validation.dto';

@Injectable()
export class AtLeastTwoBalancesPipe implements PipeTransform {
  transform(body: MovementsValidationDto) {
    if (
      !body.balances ||
      !Array.isArray(body.balances) ||
      body.balances.length < 2
    ) {
      throw new BadRequestException(
        'Please provide at least two balance checkpoints.',
      );
    }
    return body;
  }
}

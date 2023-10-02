import { Injectable } from '@nestjs/common';
import { MovementsValidationDto } from './dto/movement-validation.dto';

@Injectable()
export class MovementValidationService {
  validation({ movements, balances }: MovementsValidationDto): boolean {

    return true;
    
}

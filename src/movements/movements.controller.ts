import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { MovementValidationService } from './movements.service';
import { MovementsValidationDto } from './dto/movement-validation.dto';

@Controller('movements')
export class MovementsController {
  constructor(private movementsService: MovementValidationService) {}

  @Post('validation')
  validateMovements(
    @Body() body: MovementsValidationDto,
    @Res() response: Response,
  ) {
    const periodValidation = this.movementsService.validation(body);

    const invalidPeriods = periodValidation.filter((p) => !p.isValid);

    return invalidPeriods.length === 0
      ? response.status(202).json({ message: 'Accepted' })
      : response.status(418).json({ reason: { invalidPeriods } });
  }
}

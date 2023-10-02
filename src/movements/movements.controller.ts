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
    const isValid = this.movementsService.validation(body);

    return isValid
      ? response.status(202).json({ message: 'Accepted' })
      : response.status(418).json({ reason: 'TBD' });
  }
}

import { Module } from '@nestjs/common';
import { MovementsController } from './movements/movements.controller';
import { MovementValidationService } from './movements/movements.service';

@Module({
  imports: [],
  controllers: [MovementsController],
  providers: [MovementValidationService],
})
export class AppModule {}

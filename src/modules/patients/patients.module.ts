import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { Patient } from '../doctor/entities/paciente.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Patient]),
    // If you need appointments service in patients service, import the module
    // AppointmentsModule,
  ],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports: [PatientsService],
})
export class PatientsModule {}
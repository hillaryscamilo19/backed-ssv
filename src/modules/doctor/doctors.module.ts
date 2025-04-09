import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { DoctorsService } from "./doctors.service"
import { Appointment } from "src/appointments/entities/appointment.entity"
import { Doctor } from "./entities/doctor.entity"
import { Patient } from "./entities/paciente.entity"
import { DoctorsController } from "./doctors.controller"



@Module({
  imports: [TypeOrmModule.forFeature([Doctor, Appointment, Patient])],
  controllers: [DoctorsController],
  providers: [DoctorsService],
  exports: [DoctorsService],
})
export class DoctorsModule {}


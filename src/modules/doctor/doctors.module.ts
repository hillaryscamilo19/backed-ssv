import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { DoctorsService } from "./doctors.service"
import { Appointment } from "src/appointments/entities/appointment.entity"
import { Doctor } from "./entities/doctor.entity"
import { DoctorsController } from "./doctores.controller"



@Module({
  imports: [TypeOrmModule.forFeature([Doctor, Appointment])],
  controllers: [DoctorsController],
  providers: [DoctorsService],
  exports: [DoctorsService],
})
export class DoctorsModule {}


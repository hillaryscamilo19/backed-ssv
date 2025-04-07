import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AppointmentsService } from "./appointments.service"
import { AppointmentsController } from "./appointments.controller"
import { Appointment } from "./entities/appointment.entity"
import { DoctorsModule } from "src/modules/doctor/doctors.module"
import { PatientsModule } from "src/modules/patients/patients.module"


@Module({
  imports: [TypeOrmModule.forFeature([Appointment]), DoctorsModule, PatientsModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}


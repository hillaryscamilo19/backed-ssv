import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { PatientsService } from "./patients.service"
import { PatientsController } from "./patients.controller"
import { Patient } from "../doctor/entities/paciente.entity"


@Module({
  imports: [TypeOrmModule.forFeature([Patient])],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports: [PatientsService],
})
export class PatientsModule {}


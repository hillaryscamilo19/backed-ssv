import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common"
import type { PatientsService } from "./patients.service"

import type { PatientDto } from "./dto/patient.dto"
import { Patient } from "../doctor/entities/paciente.entity";

@Controller("api/patients")
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  create(@Body() patientDto: PatientDto): Promise<Patient> {
    return this.patientsService.create(patientDto);
  }

  @Get()
  findAll(): Promise<Patient[]> {
    return this.patientsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Patient> {
    return this.patientsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param('id') id: string, @Body() patientDto: PatientDto): Promise<Patient> {
    return this.patientsService.update(+id, patientDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.patientsService.remove(+id);
  }
}


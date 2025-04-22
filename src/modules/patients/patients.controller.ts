import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientDto } from './dto/patient.dto';
import { Patient } from './entities/patients.entity';


@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  async getAllPatients(@Query('page') page = 1, @Query('limit') limit = 50) {
    return this.patientsService.findAll(Number(page), Number(limit));
  }
  
  @Get(':lisp_IdListaEspecial')
  findOne(@Param('lisp_IdListaEspecial') id: string): Promise<Patient> {
    return this.patientsService.findOne(+id);
  }

  @Post()
  create(@Body() patientDto: PatientDto): Promise<Patient> {
    return this.patientsService.create(patientDto);
  }

  @Patch(':lisp_IdListaEspecial')
  update(@Param('lisp_IdListaEspecial') id: string, @Body() patientDto: PatientDto): Promise<Patient> {
    return this.patientsService.update(+id, patientDto);
  }

  @Delete(':lisp_IdListaEspecial')
  remove(@Param('lisp_IdListaEspecial') id: string): Promise<void> {
    return this.patientsService.remove(+id);
  }
}
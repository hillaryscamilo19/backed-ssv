import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PatientDto } from './dto/patient.dto';
import { Patient } from './entities/patients.entity';
import { promises } from 'dns';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientsRepository: Repository<Patient>,
  ) {}

  async findAll(): Promise<Patient[]> {
    return this.patientsRepository.find();
  }

  async findOne(id: number): Promise<Patient> {
    const patient = await this.patientsRepository.findOneBy({ lisp_IdDoctor: id });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return patient;
  }

  async create(patientDto: PatientDto): Promise<Patient> {
    const newPatient = this.patientsRepository.create(patientDto);
    return this.patientsRepository.save(newPatient);
  }

  async update(id: number, patientDto: PatientDto): Promise<Patient> {
    await this.patientsRepository.update({ lisp_IdDoctor: id }, patientDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.patientsRepository.delete({ lisp_IdDoctor: id });
    if (result.affected === 0) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
  }
async findByExpediente(patientDto: PatientDto): Promise<void>{

}

}
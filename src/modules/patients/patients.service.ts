import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PatientDto } from './dto/patient.dto';
import { Patient } from './entities/patients.entity';


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
    const patient = await this.patientsRepository.findOneBy({ expe_NumeroExpediente: id });
    if (!patient) {
      throw new NotFoundException(`Patient with record number ${id} not found`);
    }
    return patient;
  }

  async create(patientDto: PatientDto): Promise<Patient> {
    const newPatient = this.patientsRepository.create(patientDto);
    return this.patientsRepository.save(newPatient);
  }

  async update(id: number, patientDto: PatientDto): Promise<Patient> {
    await this.patientsRepository.update({ expe_NumeroExpediente: id }, patientDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.patientsRepository.delete({ expe_NumeroExpediente: id });
    if (result.affected === 0) {
      throw new NotFoundException(`Patient with record number ${id} not found`);
    }
  }

  async findByDoctor(doctorId: string): Promise<Patient[]> {
    return this.patientsRepository.find({
      where: { expe_IdDoctor: doctorId }
    });
  }
  
  async findByName(name: string, lastName: string): Promise<Patient[]> {
    return this.patientsRepository.createQueryBuilder('patient')
      .where('patient.expe_Nombres LIKE :name', { name: `%${name}%` })
      .andWhere('patient.expe_Apellidos LIKE :lastName', { lastName: `%${lastName}%` })
      .getMany();
  }

  async findByIdentification(cedula: string): Promise<Patient[]> {
    return this.patientsRepository.find({
      where: { expe_Cedula: cedula }
    });
  }
  
  async findByEmail(email: string): Promise<Patient[]> {
    return this.patientsRepository.find({
      where: { expe_Email: email }
    });
  }
}
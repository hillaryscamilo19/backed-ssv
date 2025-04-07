import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import type { Repository } from "typeorm"
import { Patient } from "../doctor/entities/paciente.entity"
import { PatientDto } from "./dto/patient.dto"


@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientsRepository: Repository<Patient>,
  ) {}

  async findAll(): Promise<Patient[]> {
    return this.patientsRepository.find()
  }

  async findOne(id: number): Promise<Patient> {
    const patient = await this.patientsRepository.findOne({ where: { id } })
    if (!patient) {
      throw new NotFoundException(`Paciente con ID ${id} no encontrado`)
    }
    return patient
  }

  async create(patientDto: PatientDto): Promise<Patient> {
    const patient = this.patientsRepository.create(patientDto)
    return this.patientsRepository.save(patient)
  }

  async update(id: number, patientDto: PatientDto): Promise<Patient> {
    const patient = await this.findOne(id)
    this.patientsRepository.merge(patient, patientDto)
    return this.patientsRepository.save(patient)
  }

  async remove(id: number): Promise<void> {
    const patient = await this.findOne(id)
    await this.patientsRepository.remove(patient)
  }
}


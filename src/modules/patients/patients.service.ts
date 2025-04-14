import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PatientDto } from "./dto/patient.dto";
import { Patient } from "../doctor/entities/paciente.entity";

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
    // Usar los nombres de propiedad de la entidad, no los nombres de columna de la BD
    const patient = await this.patientsRepository.findOneBy({ 
      doct_IdDoctor: id 
    });
    
    if (!patient) {
      throw new NotFoundException(`Paciente con ID ${id} no encontrado`);
    }
    return patient;
  }

  async findByExpediente(numeroExpediente: string): Promise<Patient> {
    // Usar los nombres de propiedad de la entidad, no los nombres de columna de la BD
    const patient = await this.patientsRepository.findOneBy({ 
      numeroExpediente: numeroExpediente 
    });
    
    if (!patient) {
      throw new NotFoundException(`Paciente con número de expediente ${numeroExpediente} no encontrado`);
    }
    return patient;
  }

  async create(patientDto: PatientDto): Promise<Patient> {
    // Mapear el DTO a la entidad
    const patientData = {
      doct_IdDoctor: patientDto.lisp_IdDoctor,
      nombre: patientDto.lisp_Nombre,
      apellidos: patientDto.lisP_Apellido,
      numeroExpediente: patientDto.lisp_NumeroExpediente,
      telefono: patientDto.lisp_Telefono,
      celular: patientDto.lisp_Celular,
      email: patientDto.lisp_Email
    };
    
    const patient = this.patientsRepository.create(patientData);
    return this.patientsRepository.save(patient);
  }

  async update(id: number, patientDto: PatientDto): Promise<Patient> {
    const patient = await this.findOne(id);
    
    // Mapear los campos del DTO a propiedades de la entidad
    const updateData = {
      nombre: patientDto.lisp_Nombre,
      apellidos: patientDto.lisP_Apellido,
      numeroExpediente: patientDto.lisp_NumeroExpediente,
      telefono: patientDto.lisp_Telefono,
      celular: patientDto.lisp_Celular,
      email: patientDto.lisp_Email
    };
    
    this.patientsRepository.merge(patient, updateData);
    return this.patientsRepository.save(patient);
  }

  async remove(id: number): Promise<void> {
    const patient = await this.findOne(id);
    await this.patientsRepository.remove(patient);
  }
}
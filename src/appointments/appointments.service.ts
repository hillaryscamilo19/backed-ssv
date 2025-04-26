// appointments.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>,
  ) {}

  async create(dto: CreateAppointmentDto): Promise<Appointment> {
    const nuevaAsignacion = this.appointmentRepo.create({
      lisp_IdDoctor: dto.lisp_IdDoctor,
      lisp_Fecha: dto.lisp_Fecha,
      lisp_NumeroExpediente: dto.lisp_NumeroExpediente,
      lisp_Comentario: dto.lisp_Comentario || '',
      lisp_RegPor: dto.lisp_RegPor || 'UI-App',
      lisp_Estatus: 'P',
    });

    return this.appointmentRepo.save(nuevaAsignacion);
  }
}

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
    const nuevaAsignacion = new Appointment();
  
    nuevaAsignacion.lisp_IdDoctor = dto.lisp_IdDoctor;
    nuevaAsignacion.lisp_Fecha = dto.lisp_Fecha;
    nuevaAsignacion.lisp_NumeroExpediente = dto.lisp_NumeroExpediente;
    nuevaAsignacion.lisp_Comentario = dto.lisp_Comentario || '';
    nuevaAsignacion.lisp_RegPor = dto.lisp_RegPor || 'UI-App';
    nuevaAsignacion.lisp_Estatus = 'P';
  
    return this.appointmentRepo.save(nuevaAsignacion);
  }
  
}

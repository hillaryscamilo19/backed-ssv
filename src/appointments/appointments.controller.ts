import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './entities/create-appointment.entity';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly AppointmentsService: AppointmentsService) {}

  @Get('')
  async getPacientes(
    @Query('fecha') fecha: string,
  ): Promise<CreateAppointmentDto[]> {
    
    return this.AppointmentsService.obtenerPacientesPorFecha(fecha);
  }

  @Post('create')
  async asignarDoctorYCita(@Body() data: CreateAppointmentDto) {
    console.log('DTO recibido:', data);
    return await this.AppointmentsService.asignarDoctorYCita(data);
  }
}

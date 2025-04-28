import {
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { PacienteConsultaDto } from './dto/create-appointment.dto';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './entities/create-appointment.entity';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly AppointmentsService: AppointmentsService) {}

  @Get('')
  async getPacientes(@Query('fecha') fecha: string): Promise<PacienteConsultaDto[]> {
    return this.AppointmentsService.obtenerPacientesPorFecha(fecha);
  }


  @Post('create')
  async asignarDoctorYCita(@Body() data: CreateAppointmentDto) {
    return await this.AppointmentsService.asignarDoctorYCita(data);
  }

}

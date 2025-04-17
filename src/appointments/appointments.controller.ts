import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';

import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';




@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  async create(@Body() createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    try {
      return await this.appointmentsService.create(createAppointmentDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') doct_IdDoctor: string) {
    return this.appointmentsService.findOne(doct_IdDoctor);
  }

  @Get('doctor/:doct_IdDoctor')
  findByDoctor(@Param('doct_IdDoctor') doct_IdDoctor: number) {
    return this.appointmentsService.findByDoctor(doct_IdDoctor);
  }

  @Get('patient/:patientId')
  findByPatient(@Param('patientId') patientId: number) {
    // No convertir a número para mantener la consistencia con string
    return this.appointmentsService.findByPatient(patientId);
  }

  @Put(':id/complete')
  completeAppointment(@Param('id') id: string) {
    // No convertir a número
    return this.appointmentsService.completeAppointment(id);
  }

  @Put(':id/cancel')
  cancelAppointment(@Param('id') id: string) {
    // No convertir a número
    return this.appointmentsService.cancelAppointment(id);
  }
}
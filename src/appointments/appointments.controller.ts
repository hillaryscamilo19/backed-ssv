import { Controller, Get, Post, Body, Param, Patch } from "@nestjs/common"
import type { AppointmentsService } from "./appointments.service"
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { Appointment } from "./entities/appointment.entity";


@Controller("api/appointments")
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  findAll(): Promise<Appointment[]> {
    return this.appointmentsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Appointment> {
    return this.appointmentsService.findOne(+id);
  }

  @Get('doctor/:doctorId')
  findByDoctor(@Param('doctorId') doctorId: string): Promise<Appointment[]> {
    return this.appointmentsService.findByDoctor(doctorId);
  }

  @Get('patient/:patientId')
  findByPatient(@Param('patientId') patientId: string): Promise<Appointment[]> {
    return this.appointmentsService.findByPatient(+patientId);
  }

  @Patch(':id/complete')
  completeAppointment(@Param('id') id: string): Promise<Appointment> {
    return this.appointmentsService.completeAppointment(+id);
  }

  @Patch(':id/cancel')
  cancelAppointment(@Param('id') id: string): Promise<Appointment> {
    return this.appointmentsService.cancelAppointment(+id);
  }
}


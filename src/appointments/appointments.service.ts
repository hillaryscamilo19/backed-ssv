import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import  { Repository } from "typeorm"
import { Appointment } from "./entities/appointment.entity"
import { DoctorsService } from "src/modules/doctor/doctors.service"
import { CreateAppointmentDto } from "src/modules/doctor/dto/create-appointment.dto"
import { PatientsService } from "src/modules/patients/patients.service"

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
    private doctorsService: DoctorsService,
    private patientsService: PatientsService,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const { doctorId, pacienteId, fecha } = createAppointmentDto

    // Verificar si el doctor existe
    const doctor = await this.doctorsService.findOne(doctorId)

    // Verificar si el paciente existe
    const patient = await this.patientsService.findOne(pacienteId)

    // Verificar disponibilidad del doctor
    const appointmentDate = new Date(fecha)
    const isAvailable = await this.doctorsService.checkAvailability(doctorId, appointmentDate)

    if (!isAvailable) {
      const nextAvailability = await this.doctorsService.getNextAvailability(doctorId)
      if (nextAvailability) {
        throw new BadRequestException(
          `El doctor no está disponible en esta fecha. Próxima disponibilidad: ${nextAvailability.nextDate.toLocaleDateString()} de ${nextAvailability.startTime} a ${nextAvailability.endTime}`,
        )
      } else {
        throw new BadRequestException("El doctor no está disponible en los próximos 30 días")
      }
    }

    // Crear la cita
    const appointment = this.appointmentsRepository.create({
      ...createAppointmentDto,
      fecha: appointmentDate,
      doctor,
      patient,
    })

    return this.appointmentsRepository.save(appointment)
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentsRepository.find({
      relations: ["doctor", "patient"],
    })
  }

  async findOne(id: number): Promise<Appointment> {
    const appointment = await this.appointmentsRepository.findOne({
      where: { id },
      relations: ["doctor", "patient"],
    })

    if (!appointment) {
      throw new NotFoundException(`Cita con ID ${id} no encontrada`)
    }

    return appointment
  }

  async findByDoctor(doctorId: string): Promise<Appointment[]> {
    return this.appointmentsRepository.find({
      where: { doctorId },
      relations: ["patient"],
    })
  }

  async findByPatient(pacienteId: number): Promise<Appointment[]> {
    return this.appointmentsRepository.find({
      where: { pacienteId },
      relations: ["doctor"],
    })
  }

  async completeAppointment(id: number): Promise<Appointment> {
    const appointment = await this.findOne(id)
    appointment.completada = true
    appointment.estado = "COMPLETADA"
    return this.appointmentsRepository.save(appointment)
  }

  async cancelAppointment(id: number): Promise<Appointment> {
    const appointment = await this.findOne(id)
    appointment.estado = "CANCELADA"
    return this.appointmentsRepository.save(appointment)
  }
}


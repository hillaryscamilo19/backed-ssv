import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Any, Repository } from "typeorm"
import { Appointment } from "./entities/appointment.entity"
import { DoctorsService } from "src/modules/doctor/doctors.service"
import { CreateAppointmentDto } from "./dto/create-appointment.dto"
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
    const { cita_IdDoctor, cita_NumeroExpediente, cita_Fecha } = createAppointmentDto

    // Verificar si el doctor existe
    const doctor = await this.doctorsService.findOne(cita_IdDoctor)

    // Verificar si el paciente existe (si se proporciona un número de expediente)


    // Verificar disponibilidad del doctor
    const appointmentDate = new Date(cita_Fecha)
    const isAvailable = await this.doctorsService.checkAvailability(cita_IdDoctor, appointmentDate)

    if (!isAvailable) {
      const nextAvailability = await this.doctorsService.getNextAvailability(cita_IdDoctor)
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
      doctor,

    })

    return this.appointmentsRepository.save(appointment)
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentsRepository.find({
      relations: ["doctor", "patient"],
    })
  }

  async findOne(id: string): Promise<Appointment> {
    const appointment = await this.appointmentsRepository.findOne({
      where: { cita_IdDoctor: id },
      relations: ["doctor", "patient"],
    })

    if (!appointment) {
      throw new NotFoundException(`Cita con ID ${id} no encontrada`)
    }

    return appointment
  }

  async findByDoctor(doctorId: string): Promise<Appointment[]> {
    return this.appointmentsRepository.find({
      where: { cita_IdDoctor: doctorId },
      relations: ["patient"],
    })
  }

  async findByPatient(numeroExpediente: string): Promise<Appointment[]> {
    return this.appointmentsRepository.find({
      where: {numeroExpediente: numeroExpediente },
      relations: ["doctor"],
    })
  }

  async completeAppointment(id: string): Promise<Appointment> {
    const appointment = await this.findOne(id)
    appointment.estatusConf = "COMPLETADA"
    return this.appointmentsRepository.save(appointment)
  }

  async cancelAppointment(id: string): Promise<Appointment> {
    const appointment = await this.findOne(id)
    appointment.estatusConf = "CANCELADA"
    return this.appointmentsRepository.save(appointment)
  }
}
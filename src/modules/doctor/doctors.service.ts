import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import  { Repository } from "typeorm"
import { Doctor } from "./entities/doctor.entity"
import { Appointment } from "src/appointments/entities/appointment.entity"


@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private doctorsRepository: Repository<Doctor>,
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
  ) {}

  async findAll(): Promise<Doctor[]> {
    return this.doctorsRepository.find()
  }

  async findOne(id: string): Promise<Doctor> {
    const doctor = await this.doctorsRepository.findOne({ where: { id } })
    if (!doctor) {
      throw new NotFoundException(`Doctor con ID ${id} no encontrado`)
    }
    return doctor
  }

  async checkAvailability(doctorId: string, date: Date): Promise<boolean> {
    const doctor = await this.findOne(doctorId)

    // Verificar si el doctor trabaja ese día de la semana
    const dayOfWeek = date.getDay() // 0 = Domingo, 1 = Lunes, etc.
    let isWorkingDay = false

    switch (dayOfWeek) {
      case 0:
        isWorkingDay = doctor.consultaDom
        break
      case 1:
        isWorkingDay = doctor.consultaLun
        break
      case 2:
        isWorkingDay = doctor.consultaMar
        break
      case 3:
        isWorkingDay = doctor.consultaMie
        break
      case 4:
        isWorkingDay = doctor.consultaJue
        break
      case 5:
        isWorkingDay = doctor.consultaVie
        break
      case 6:
        isWorkingDay = doctor.consultaSab
        break
    }

    if (!isWorkingDay) {
      return false
    }

    // Verificar si ya tiene una cita para esa fecha
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)

    const appointments = await this.appointmentsRepository.find({
      where: {
        doctorId,
        fecha: date,
        completada: false,
      },
    })

    // Si ya tiene citas activas, no está disponible
    return appointments.length === 0
  }

  async getNextAvailability(doctorId: string): Promise<{ nextDate: Date; startTime: string; endTime: string } | null> {
    const doctor = await this.findOne(doctorId)
    const today = new Date()

    // Buscar el próximo día disponible (hasta 30 días en el futuro)
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today)
      checkDate.setDate(today.getDate() + i)

      const isAvailable = await this.checkAvailability(doctorId, checkDate)
      if (isAvailable) {
        const dayOfWeek = checkDate.getDay()
        let startTime = ""
        let endTime = ""

        switch (dayOfWeek) {
          case 0:
            startTime = doctor.horIniConDom
            endTime = doctor.horFinConDom
            break
          case 1:
            startTime = doctor.horIniConLun
            endTime = doctor.horFinConLun
            break
          case 2:
            startTime = doctor.horIniConMar
            endTime = doctor.horFinConMar
            break
          case 3:
            startTime = doctor.horIniConMie
            endTime = doctor.horFinConMie
            break
          case 4:
            startTime = doctor.horIniConJue
            endTime = doctor.horFinConJue
            break
          case 5:
            startTime = doctor.horIniConVie
            endTime = doctor.horFinConVie
            break
          case 6:
            startTime = doctor.horIniConSab
            endTime = doctor.horFinConSab
            break
        }

        return {
          nextDate: checkDate,
          startTime,
          endTime,
        }
      }
    }

    return null
  }
}


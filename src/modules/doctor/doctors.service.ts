import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Doctor } from "./entities/doctor.entity";
import { Appointment } from "src/appointments/entities/appointment.entity";

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private doctorsRepository: Repository<Doctor>,
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
  ) {}

  async findAll(): Promise<Doctor[]> {
    return this.doctorsRepository.find();
  }

  async findOne(doct_IdDoctor: string): Promise<Doctor> {
    // Usar los nombres de propiedad de la entidad, no los nombres de columna de la BD
    const doctor = await this.doctorsRepository.findOneBy({ 
      doct_IdDoctor: doct_IdDoctor 
    });
    
    if (!doctor) {
      throw new NotFoundException(`Doctor con ID ${doct_IdDoctor} no encontrado`);
    }
    return doctor;
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
            startTime = doctor.doct_HorIniConDom
            endTime = doctor.doct_HorFinConDom
            break
          case 1:
            startTime = doctor.doct_HorIniConLun
            endTime = doctor.doct_HorFinConLun
            break
          case 2:
            startTime = doctor.doct_HorIniConMar
            endTime = doctor.doct_HorFinConMar
            break
          case 3:
            startTime = doctor.doct_HorIniConMie
            endTime = doctor.doct_HorFinConMie
            break
          case 4:
            startTime = doctor.doct_HorIniConJue
            endTime = doctor.doct_HorFinConJue
            break
          case 5:
            startTime = doctor.doct_HorIniConVie
            endTime = doctor.doct_HorFinConVie
            break
          case 6:
            startTime = doctor.doct_HorIniConSab
            endTime = doctor.doct_HorFinConSab
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

  async checkAvailability(doctorId: string, date: Date): Promise<boolean> {
    const doctor = await this.findOne(doctorId);

    // Verificar si el doctor trabaja ese día de la semana
    const dayOfWeek = date.getDay(); // 0 = Domingo, 1 = Lunes, etc.
    let isWorkingDay = false;

    switch (dayOfWeek) {
      case 0:
        isWorkingDay = doctor.doct_ConsultaDom;
        break;
      case 1:
        isWorkingDay = doctor.doct_ConsultaLun;
        break;
      case 2:
        isWorkingDay = doctor.doct_ConsultaMar;
        break;
      case 3:
        isWorkingDay = doctor.doct_ConsultaMie;
        break;
      case 4:
        isWorkingDay = doctor.doct_ConsultaJue;
        break;
      case 5:
        isWorkingDay = doctor.doct_ConsultaVie;
        break;
      case 6:
        isWorkingDay = doctor.doct_ConsultaSab;
        break;
    }

    if (!isWorkingDay) {
      return false;
    }

    // Verificar si ya tiene una cita para esa fecha
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const appointments = await this.appointmentsRepository.find({
      where: {
        cita_IdDoctor: doctorId,  // Usando el nombre de propiedad de la entidad
        fecha: date,         // Usando el nombre de propiedad de la entidad
        estatusConf: "PROGRAMADA"  // Usando el nombre de propiedad de la entidad
      },
    });

    // Si ya tiene citas activas, no está disponible
    return appointments.length === 0;
  }

  // El resto del código del servicio...
}
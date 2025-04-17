import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DoctorsService } from "src/modules/doctor/doctors.service";
import { PatientsService } from "src/modules/patients/patients.service";
import { Appointment } from "./entities/appointment.entity";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";


@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
    private doctorsService: DoctorsService,
    private patientsService: PatientsService
  ) { }

  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    let { cita_IdDoctor, cita_Fecha, cita_NumeroExpediente } = createAppointmentDto;

    // Verificar si el doctor existe
    const doctor = await this.doctorsService.findOne(cita_IdDoctor);
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${cita_IdDoctor} not found`);
    }

    // Verificar si el paciente existe (si se proporciona el número de expediente)
    if (cita_NumeroExpediente) {
      const patient = await this.patientsService.findOne(Number(cita_NumeroExpediente));
      if (!patient) {
        throw new NotFoundException(`Patient with record number ${cita_NumeroExpediente} not found`);
      }
    }

    const appointmentDate = new Date(cita_Fecha);

    // Verificar disponibilidad del doctor
    const isAvailable = await this.checkDoctorAvailability(cita_IdDoctor, appointmentDate);
    if (!isAvailable) {
      const nextAvailability = await this.getNextDoctorAvailability(cita_IdDoctor);
      if (nextAvailability) {
        throw new BadRequestException(
          `Doctor is not available on this date. Next availability: ${nextAvailability.nextDate.toLocaleDateString()} from ${nextAvailability.startTime} to ${nextAvailability.endTime}`
        );
      } else {
        throw new BadRequestException("Doctor is not available in the next 30 days");
      }
    }

    // Crear y guardar la cita
    const appointment: Appointment = {
      ...createAppointmentDto,
      cita_IdDoctor: +cita_IdDoctor // asegúrate que sea un número
    };
    return this.appointmentsRepository.save(appointment);
  }


  async findAll(): Promise<Appointment[]> {
    return this.appointmentsRepository.find({
      relations: ["doctor", "patient"],
    });
  }
  async findOne(id): Promise<Appointment> {
    const appointment = await this.appointmentsRepository.findOne({
      where: { cita_IdDoctor: id },
      relations: ["doctor", "patient"],
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    return appointment;
  }


  async findByDoctor(doctorId: number): Promise<Appointment[]> {
    return this.appointmentsRepository.find({
      where: { cita_IdDoctor: doctorId },
      relations: ["patient"],
    });
  }


  async findByPatient(patientId: number): Promise<Appointment[]> {
    return this.appointmentsRepository.find({
      where: { cita_IdDoctor: patientId }, // <- este campo debe ser el correcto para paciente
      relations: ["doctor"],
    });
  }

  async completeAppointment(id: string): Promise<Appointment> {
    const appointment = await this.findOne(id);
    appointment.cita_EstatusConf = "COMPLETADA";
    return this.appointmentsRepository.save(appointment);
  }

  async cancelAppointment(id: string): Promise<Appointment> {
    const appointment = await this.findOne(id);
    appointment.cita_EstatusConf = "CANCELADA";
    return this.appointmentsRepository.save(appointment);
  }

  //Method to check doctor availability
  async checkDoctorAvailability(doctorId: string, date: Date): Promise<boolean> {
    const doctor = await this.doctorsService.findOne(doctorId);

    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${doctorId} not found`);
    }

    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const timeString = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    //Check if doctor accepts appointments on this day
    let isDayAvailable = false;
    let startTimeField = '';
    let endTimeField = '';

    switch (dayOfWeek) {
      case 0: // Sunday
        isDayAvailable = doctor.doct_CitaDom;
        startTimeField = 'doct_HorIniCitDom';
        endTimeField = 'doct_HorFinCitDom';
        break;
      case 1: // Monday
        isDayAvailable = doctor.doct_CitaLun;
        startTimeField = 'doct_HorIniCitLun';
        endTimeField = 'doct_HorFinCitLun';
        break;
      case 2: // Tuesday
        isDayAvailable = doctor.doct_CitaMar;
        startTimeField = 'doct_HorIniCitMar';
        endTimeField = 'doct_HorFinCitMar';
        break;
      case 3: // Wednesday
        isDayAvailable = doctor.doct_CitaMie;
        startTimeField = 'doct_HorIniCitMie';
        endTimeField = 'doct_HorFinCitMie';
        break;
      case 4: // Thursday
        isDayAvailable = doctor.doct_CitaJue;
        startTimeField = 'doct_HorIniCitJue';
        endTimeField = 'doct_HorFinCitJue';
        break;
      case 5: // Friday
        isDayAvailable = doctor.doct_CitaVie;
        startTimeField = 'doct_HorIniCitVie';
        endTimeField = 'doct_HorFinCitVie';
        break;
      case 6: // Saturday
        isDayAvailable = doctor.doct_CitaSab;
        startTimeField = 'doct_HorIniCitSab';
        endTimeField = 'doct_HorFinCitSab';
        break;
    }

    if (!isDayAvailable) {
      return false;
    }

    //Check if the time is within doctor's appointment hours
    const startTime = doctor[startTimeField];
    const endTime = doctor[endTimeField];

    if (!startTime || !endTime) {
      return false;
    }

    //Check if the time is within range
    if (timeString < startTime || timeString > endTime) {
      return false;
    }

    //Check if there are already scheduled appointments for this time
    const existingAppointments = await this.appointmentsRepository.count({
      where: {
        cita_IdDoctor: doctorId,
        cita_RegPorEstatusConf: 'PROGRAMADA'
      }
    });

    //Limit based on maximum appointments per day
    let maxAppointments = 1;
    switch (dayOfWeek) {
      case 0: maxAppointments = doctor.doct_CantCitaDom || 1; break;
      case 1: maxAppointments = doctor.doct_CantCitaLun || 1; break;
      case 2: maxAppointments = doctor.doct_CantCitaMar || 1; break;
      case 3: maxAppointments = doctor.doct_CantCitaMie || 1; break;
      case 4: maxAppointments = doctor.doct_CantCitaJue || 1; break;
      case 5: maxAppointments = doctor.doct_CantCitaVie || 1; break;
      case 6: maxAppointments = doctor.doct_CantCitaSab || 1; break;
    }

    return existingAppointments < maxAppointments;
  }

  // Method to get next doctor availability
  async getNextDoctorAvailability(doctorId: string): Promise<{ nextDate: Date, startTime: string, endTime: string } | null> {
    const doctor = await this.doctorsService.findOne(doctorId);
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${doctorId} not found`);
    }

    const today = new Date();
    const maxDays = 30; // Search availability for next 30 days

    for (let i = 1; i <= maxDays; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() + i);

      const dayOfWeek = checkDate.getDay();

      // Check if doctor attends on this day
      let isDayAvailable = false;
      let startTime = '';
      let endTime = '';

      switch (dayOfWeek) {
        case 0: // Sunday
          isDayAvailable = doctor.doct_CitaDom;
          startTime = doctor.doct_HorIniCitDom;
          endTime = doctor.doct_HorFinCitDom;
          break;
        case 1: // Monday
          isDayAvailable = doctor.doct_CitaLun;
          startTime = doctor.doct_HorIniCitLun;
          endTime = doctor.doct_HorFinConLun;
          break;
        case 2: // Tuesday
          isDayAvailable = doctor.doct_CitaMar;
          startTime = doctor.doct_HorIniConMar;
          endTime = doctor.doct_HorFinConMar;
          break;
        case 3: // Wednesday
          isDayAvailable = doctor.doct_CitaMie;
          startTime = doctor.doct_HorFinConMie;
          endTime = doctor.doct_HorFinConMie;
          break;
        case 4: // Thursday
          isDayAvailable = doctor.doct_CitaJue;
          startTime = doctor.doct_HorIniConJue;
          endTime = doctor.doct_HorFinConJue;
          break;
        case 5: // Friday
          isDayAvailable = doctor.doct_CitaVie;
          startTime = doctor.doct_HorIniConVie;
          endTime = doctor.doct_HorFinConVie;
          break;
        case 6: // Saturday
          isDayAvailable = doctor.doct_CitaSab;
          startTime = doctor.doct_HorIniConSab;
          endTime = doctor.doct_HorFinConSab;
          break;
      }

      if (isDayAvailable && startTime && endTime) {
        // Convert start time to hours and minutes
        const [startHour, startMinute] = startTime.split(':').map(Number);
        checkDate.setHours(startHour, startMinute, 0, 0);

        // Check if appointments are available on this day
        const isAvailable = await this.checkDoctorAvailability(doctorId, checkDate);

        if (isAvailable) {
          return {
            nextDate: checkDate,
            startTime,
            endTime
          };
        }
      }
    }

    // No availability found in the next days
    return null;
  }
}
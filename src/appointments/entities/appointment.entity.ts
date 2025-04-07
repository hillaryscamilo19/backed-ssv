import { Doctor } from "src/modules/doctor/entities/doctor.entity"
import { Patient } from "src/modules/doctor/entities/paciente.entity"
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"


@Entity("Citas")
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  fecha: Date

  @Column({ length: 6 })
  horaInicio: string

  @Column({ length: 6 })
  horaFin: string

  @Column({ default: false })
  completada: boolean

  @Column({ default: "PROGRAMADA" })
  estado: string

  @ManyToOne(
    () => Doctor,
    (doctor) => doctor.appointments,
  )
  @JoinColumn({ name: "doctorId" })
  doctor: Doctor

  @Column()
  doctorId: string

  @ManyToOne(
    () => Patient,
    (patient) => patient.appointments,
  )
  @JoinColumn({ name: "pacienteId" })
  patient: Patient

  @Column()
  pacienteId: number
}


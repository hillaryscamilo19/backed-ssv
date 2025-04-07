import { Appointment } from "src/appointments/entities/appointment.entity"
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"


@Entity("Pacientes")
export class Patient {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 50 })
  nombre: string

  @Column({ length: 50 })
  apellidos: string

  @Column({ length: 13, nullable: true })
  telefono: string

  @Column({ length: 100, nullable: true })
  email: string

  @Column({ nullable: true })
  fechaNacimiento: Date

  @OneToMany(
    () => Appointment,
    (appointment) => appointment.patient,
  )
  appointments: Appointment[]
}


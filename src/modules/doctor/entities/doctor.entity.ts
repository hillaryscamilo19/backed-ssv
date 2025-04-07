import { Appointment } from "src/appointments/entities/appointment.entity"
import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm"

@Entity("s_Doctor")
export class Doctor {
  @PrimaryColumn({ name: "doct_IdDoctor", length: 15 })
  id: string

  @Column({ name: "doct_Nombre", length: 50, nullable: true })
  nombre: string

  @Column({ name: "doct_Estatus", length: 1, nullable: true })
  estatus: string

  @Column({ name: "doct_ConsultaDom", nullable: true })
  consultaDom: boolean

  @Column({ name: "doct_ConsultaLun", nullable: true })
  consultaLun: boolean

  @Column({ name: "doct_ConsultaMar", nullable: true })
  consultaMar: boolean

  @Column({ name: "doct_ConsultaMie", nullable: true })
  consultaMie: boolean

  @Column({ name: "doct_ConsultaJue", nullable: true })
  consultaJue: boolean

  @Column({ name: "doct_ConsultaVie", nullable: true })
  consultaVie: boolean

  @Column({ name: "doct_ConsultaSab", nullable: true })
  consultaSab: boolean

  // Horarios de inicio de consulta para cada día
  @Column({ name: "doct_HorIniConDom", length: 6, nullable: true })
  horIniConDom: string

  @Column({ name: "doct_HorIniConLun", length: 6, nullable: true })
  horIniConLun: string

  @Column({ name: "doct_HorIniConMar", length: 6, nullable: true })
  horIniConMar: string

  @Column({ name: "doct_HorIniConMie", length: 6, nullable: true })
  horIniConMie: string

  @Column({ name: "doct_HorIniConJue", length: 6, nullable: true })
  horIniConJue: string

  @Column({ name: "doct_HorIniConVie", length: 6, nullable: true })
  horIniConVie: string

  @Column({ name: "doct_HorIniConSab", length: 6, nullable: true })
  horIniConSab: string

  // Horarios de fin de consulta para cada día
  @Column({ name: "doct_HorFinConDom", length: 6, nullable: true })
  horFinConDom: string

  @Column({ name: "doct_HorFinConLun", length: 6, nullable: true })
  horFinConLun: string

  @Column({ name: "doct_HorFinConMar", length: 6, nullable: true })
  horFinConMar: string

  @Column({ name: "doct_HorFinConMie", length: 6, nullable: true })
  horFinConMie: string

  @Column({ name: "doct_HorFinConJue", length: 6, nullable: true })
  horFinConJue: string

  @Column({ name: "doct_HorFinConVie", length: 6, nullable: true })
  horFinConVie: string

  @Column({ name: "doct_HorFinConSab", length: 6, nullable: true })
  horFinConSab: string

  @OneToMany(
    () => Appointment,
    (appointment) => appointment.doctor,
  )
  appointments: Appointment[]
}


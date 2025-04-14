import { Appointment } from "src/appointments/entities/appointment.entity"
import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm"


@Entity("dbo.s_ListaPaciente")
export class Patient {
   
  @PrimaryColumn()
  lisp_IdDoctor: number

  @Column()
  lisp_Fecha: Date

  @Column()
  lisp_Secuencia: number

  @Column({ nullable: true })
  lisp_NumeroExpediente: string

  @Column()
  lisp_Nombre: string

  @Column()
  lisP_Apellido: string

  @Column({ nullable: true })
  lisp_Comentario: string

  @Column({ nullable: true })
  lisp_IdMotivo: string

  @Column({ nullable: true })
  lisp_IdSeguro: string

  @Column({ nullable: true })
  lisp_IdPlanSeguro: string

  @Column({ nullable: true })
  lisp_NumeroAfiliado: string

  @Column({ nullable: true })
  lisp_NumeroPoliza: string

  @Column({ nullable: true })
  lisp_NumeroAutorizacion: string

  @Column({ nullable: true })
  lisp_Estatus: string

  @Column({ nullable: true })
  lisp_HoraLlegada: string

  @Column({ nullable: true })
  lisp_HoraIniConsulta: string

  @Column({ nullable: true })
  lisp_HoraFinConsulta: string

  @Column({ nullable: true })
  lisp_HoraPago: string

  @Column({ nullable: true })
  lisp_HoraIniProceso: string

  @Column({ nullable: true })
  lisp_HoraFinProceso: string

  @Column({ nullable: true })
  lisp_EstatusProceso: string

  @OneToMany(
    () => Appointment,
    (appointment) => appointment.patient
  )
  appointments: Appointment[]
}
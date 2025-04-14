import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Doctor } from 'src/modules/doctor/entities/doctor.entity';
import { Patient } from 'src/modules/doctor/entities/paciente.entity';


@Entity('dbo.s_Cita')
export class Appointment {
  @PrimaryGeneratedColumn({ name: 'cita_IdDoctor' })
  cita_IdDocto: number;

  @Column({ name: 'cita_IdDoctor' })
  cita_IdDoctor: string;

  @Column({ name: 'cita_Fecha', type: 'datetime' })
  fecha: Date;

  @Column({ name: 'cita_hora' })
  hora: string;

  @Column({ name: 'cita_NumeroExpediente', nullable: true })
  numeroExpediente?: string;

  @Column({ name: 'cita_HoraNumero', nullable: true })
  horaNumero?: number;

  @Column({ name: 'cita_Nombre' })
  nombre: string;

  @Column({name: ''})
  @Column({ name: 'cita_Apellido' })
  apellido: string;

  @Column({ name: 'cita_Telefono', nullable: true })
  telefono?: string;

  @Column({ name: 'cita_Celular', nullable: true })
  celular?: string;

  @Column({ name: 'cita_IdSeguro', nullable: true })
  idSeguro?: string;

  @Column({ name: 'cita_IdPlanSeguro', nullable: true })
  idPlanSeguro?: string;

  @Column({ name: 'cita_Comentario', nullable: true })
  comentario?: string;

  @Column({ name: 'cita_EstatusConf', default: 'PROGRAMADA' })
  estatusConf: string;

  @Column({ name: 'cita_Email', nullable: true })
  email?: string;

  @Column({ name: 'cita_Nota', nullable: true })
  nota?: string;

  @Column({ name: 'cita_NumeroAfiliado', nullable: true })
  numeroAfiliado?: string;

  @Column({ name: 'cita_NumeroPoliza', nullable: true })
  numeroPoliza?: string;

  @Column({ name: 'cita_Prioridad', nullable: true })
  prioridad?: number;

  @ManyToOne(() => Doctor)
  @JoinColumn({ name: 'cita_IdDoctor', referencedColumnName: 'doct_IdDoctor' })
  doctor: Doctor;

  @ManyToOne(() => Patient, { nullable: true })
  @JoinColumn({ name: 'cita_NumeroExpediente', referencedColumnName: 'numeroExpediente' })
  patient: Patient;
}
import { Type } from 'class-transformer';
import { Doctor } from 'src/modules/doctor/entities/doctor.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Expediente } from './expediente.entity';
@Entity('dbo.s_Cita')
export class Appointment {
  @PrimaryGeneratedColumn()
  NumCita: number;

  @ManyToOne(() => Expediente)
  @JoinColumn({ name: 'cita_NumeroExpediente', referencedColumnName: 'expe_NumeroExpediente' })
  patient: Expediente;

  @Column()
  cita_NumeroExpediente: number;

  @ManyToOne(() => Expediente, (expediente) => expediente.citas)
  @JoinColumn({ name: 'cita_NumeroExpediente', referencedColumnName: 'expe_NumeroExpediente' })
  paciente: Expediente;

  @Column()
  cita_IdDoctor: Number;

  @ManyToOne(() => Doctor, (doctor) => doctor.citas)
  @JoinColumn({ name: 'cita_IdDoctor', referencedColumnName: 'doct_IdDoctor' })
  doctor: Doctor;

  @Column({})
  cita_Fecha: Date;

  @Column()
  cita_hora: string;

  @Column({ nullable: true })
  cita_Nombre: string;

  @Column({ nullable: true })
  cita_Apellido: string;

  @Column({ nullable: true })
  cita_Telefono: string;

  @Column({ name: 'cita_IdSeguro' })
  cita_IdSeguro: number;

  @Column({ name: 'cita_IdPlanSeguro' })
  cita_IdPlanSeguro: number;

  @Column({ name: 'cita_Comentario' })
  cita_Comentario?: string;

  @Column({ name: 'cita_EstatusConf' })
  cita_EstatusConf?: string;

  @Column({ name: 'cita_FechaEstatusConf', type: 'datetime' })
  cita_FechaEstatusConf?: Date;

  @Column({ name: 'cita_RegPorEstatusConf' })
  cita_RegPorEstatusConf?: String;

  @Column({ name: 'cita_RegPor' })
  cita_RegPor?: string;

  @Column({ name: 'cita_FecReg', type: 'datetime' })
  cita_FecReg?: Date;

  @Column({ name: 'cita_Email' })
  cita_Email?: string;

  @Column({ name: 'cita_StsEmail' })
  cita_StsEmail?: string;

  @Column({ name: 'cita_FechaEmail', type: 'datetime' })
  cita_FechaEmail?: Date;

  @Column({ name: 'cita_ConfEmailUsada' })
  cita_ConfEmailUsada?: string;

  @Column({ name: 'cita_Nota' })
  cita_Nota?: string;

  @Type(() => String)
  @Column({ name: 'IdOrig' })
  IdOrig?: string;


  @Type(() => Number)
  @Column({ name: 'NumLista' })
  NumLista: number;

  @Type(() => String)
  @Column({ name: 'IdConsultorio', nullable: true })
  IdConsultorio: number;

  @Type(() => String)
  @Column({ name: 'IdEntidadRef', nullable: true })
  IdEntidadRef: number;


  @Type(() => String)
  @Column({ name: 'cita_Celular' })
  cita_Celular: string;

  @Type(() => String)
  @Column({ name: 'NumPrecita' })
  NumPrecita: number;

  @Type(() => String)
  @Column({ name: 'cita_NumeroAfiliado' })
  cita_NumeroAfiliado: string;


  @Type(() => String)
  @Column({ name: 'cita_NumeroPoliza' })
  cita_NumeroPoliza: string;

  @Type(() => String)
  @Column({ name: 'cita_Prioridad' })
  cita_Prioridad?: number;

  @OneToMany(() => Appointment, appointment => appointment.doctor)
  appointments: Appointment[];
}

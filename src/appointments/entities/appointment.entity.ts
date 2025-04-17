import { Type } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('dbo.s_Cita')
export class Appointment {
  @PrimaryGeneratedColumn()
  @Type(() => Number)
  cita_IdDoctor: number;

  @Column({ name: 'cita_Fecha'})
  cita_Fecha: Date;

  @Column({ name: 'cita_hora' })
  cita_hora: string;

  @Column({ name: 'cita_NumeroExpediente' })
  cita_NumeroExpediente: number;

  @Column({ name: 'cita_HoraNumero' })
  cita_HoraNumero: number;

  @Column({ name: 'cita_Nombre' })
  cita_Nombre: string;

  @Column({ name: 'cita_Apellido' })
  cita_Apellido: string;

  @Column({ name: 'cita_Telefono' })
  cita_Telefono: string;

  @Column({ name: 'cita_IdSeguro' })
  cita_IdSeguro: number;

  @Column({ name: 'cita_IdPlanSeguro' })
  cita_IdPlanSeguro: number;

  @Column({ name: 'cita_Comentario', nullable: true })
  cita_Comentario: string;

  @Column({ name: 'cita_EstatusConf', nullable: true })
  cita_EstatusConf: string;

  @Column({ name: 'cita_FechaEstatusConf', type: 'datetime', nullable: true })
  cita_FechaEstatusConf: Date;

  @Column({ name: 'cita_RegPorEstatusConf', nullable: true })
  cita_RegPorEstatusConf: string;

  @Column({ name: 'cita_RegPor', nullable: true })
  cita_RegPor: string;

  @Column({ name: 'cita_FecReg', type: 'datetime' })
  cita_FecReg: Date;

  @Column({ name: 'cita_Email', nullable: true })
  cita_Email: string;

  @Column({ name: 'cita_StsEmail', nullable: true })
  cita_StsEmail: string;

  @Column({ name: 'cita_FechaEmail', type: 'datetime', nullable: true })
  cita_FechaEmail: Date;

  @Column({ name: 'cita_ConfEmailUsada', nullable: true })
  cita_ConfEmailUsada: string;

  @Column({ name: 'cita_Nota', nullable: true })
  cita_Nota: string;

  @Column({ name: 'IdOrig', nullable: true })
  IdOrig: string;

  @Column({ name: 'NumLista', nullable: true })
  NumLista: number;

  @Column({ name: 'IdConsultorio', nullable: true })
  IdConsultorio: number;

  @Column({ name: 'IdEntidadRef', nullable: true })
  IdEntidadRef: number;

  @Column({ name: 'cita_Celular', nullable: true })
  cita_Celular: string;

  @Column({ name: 'NumPrecita', nullable: true })
  NumPrecita: number;

  @Column({ name: 'cita_NumeroAfiliado', nullable: true })
  cita_NumeroAfiliado: string;

  @Column({ name: 'cita_NumeroPoliza', nullable: true })
  cita_NumeroPoliza: string;

  @Column({ name: 'cita_Prioridad', nullable: true })
  cita_Prioridad: number;
}

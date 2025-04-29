import { Type } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 's_ListaPaciente', schema: 'dbo' })
export class Appointment {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  expe_NumeroExpediente: number;

  
  @Type(() => Number)
  @Column()
  lisp_IdDoctor: number;

  @Column({ type: 'date' })
  lisp_Fecha: Date;

  @Column()
  lisp_HoraLlegada: string;

  @Column({ nullable: true })
  lisp_HoraFinConsulta?: string;

  @Column()
  lisp_Estatus: string
}

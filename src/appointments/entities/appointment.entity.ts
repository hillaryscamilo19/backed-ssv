import { Type } from 'class-transformer'; 
import { IsDate, IsDateString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 's_ListaPaciente', schema: 'dbo' })
export class Appointment {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  expe_NumeroExpediente: number;

  
  @Type(() => Number)
  @Column()
  lisp_IdDoctor: number;zz

  @Type(() => Date) // Necesario para transformar correctamente
  @IsDate({ message: 'lisp_Fecha debe ser una fecha válida' })
  lisp_Fecha: Date;

  @Column()
  lisp_HoraLlegada: string;

  @Column({ nullable: true })
  lisp_HoraFinConsulta?: string;

  @Column()
  lisp_Estatus: string
}

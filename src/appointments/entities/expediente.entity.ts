import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 's_ListaPaciente', schema: 'dbo' })
export class Appointment {
  @PrimaryGeneratedColumn({ name: 'lisp_Id' })
  lisp_Id: number;

  @Column({ name: 'lisp_IdDoctor' })
  lisp_IdDoctor: number;

  @Column({ name: 'lisp_Fecha', type: 'date' })
  lisp_Fecha: string;

  @Column({name: 'lisp_Nombre'})
  lisp_Nombre: string;

  @Column({ name: 'lisP_Apellido'})
  lisP_Apellido: string;

  @Column({ name: 'lisp_NumeroExpediente', nullable: true })
  lisp_NumeroExpediente: string;

  @Column({ name: 'lisp_Comentario', nullable: true })
  lisp_Comentario: string;

  @Column({ name: 'lisp_RegPor' })
  lisp_RegPor: string;

  @Column({ name: 'lisp_Estatus' })
  lisp_Estatus: string;
}

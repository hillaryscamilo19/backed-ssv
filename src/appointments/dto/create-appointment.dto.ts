import { PrimaryGeneratedColumn, Column } from 'typeorm';
export class CreateAppointmentDto {
  @PrimaryGeneratedColumn()
  id: number; // Puedes omitir esto si no hay clave primaria

  @Column()
  lisp_IdDoctor: number;

  @Column()
  lisp_Fecha: Date;

  @Column()
  lisp_NumeroExpediente: number;

  @Column({ nullable: true })
  lisp_Comentario: string;

  @Column({ nullable: true })
  lisp_RegPor: string;

  @Column({ default: 'P' })
  lisp_Estatus: string;

}

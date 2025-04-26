import { Entity, Column } from "typeorm";

@Entity({ name: 's_ListaPaciente', schema: 'dbo', database: 'Expediente-Test' })
export class Appointment {

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

import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity('dbo.s_ListaPaciente') // Nombre de la tabla en la base de datos
export class Patient {
  @PrimaryGeneratedColumn({ name: 'lisp_IdListaEspecial' })
  lisp_IdListaEspecia: number;

  @Column({name: 'lisp_IdListaEspecial'})
  lisp_IdListaEspecial: number;

  @Column({ name: 'lisp_IdDoctor' }) // Especifica el nombre de la columna en la BD
  doct_IdDoctor: number;

  @Column({ name: 'lisp_Nombre' })
  nombre: string;

  @Column({ name: 'lisP_Apellido' })
  apellidos: string;

  @Column({ name: 'lisp_NumeroExpediente', nullable: true })
  numeroExpediente?: string;



  // Agrega aquí otros campos que necesites
}
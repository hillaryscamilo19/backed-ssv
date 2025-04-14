import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity('lisp') // Nombre de la tabla en la base de datos
export class Patient {
  @PrimaryGeneratedColumn()
  id: number; // ID autogenerado para la entidad

  @Column({ name: 'lisp_IdDoctor' }) // Especifica el nombre de la columna en la BD
  doct_IdDoctor: number;

  @Column({ name: 'lisp_Nombre' })
  nombre: string;

  @Column({ name: 'lisP_Apellido' })
  apellidos: string;

  @Column({ name: 'lisp_NumeroExpediente', nullable: true })
  numeroExpediente?: string;

  @Column({ name: 'lisp_Telefono', nullable: true })
  telefono?: string;

  @Column({ name: 'lisp_Celular', nullable: true })
  celular?: string;

  @Column({ name: 'lisp_Email', nullable: true })
  email?: string;

  // Agrega aquí otros campos que necesites
}
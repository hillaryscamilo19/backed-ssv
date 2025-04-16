import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity('dbo.s_Expediente') // Nombre de la tabla en la base de datos
export class Patient {
  @PrimaryGeneratedColumn({ name: 'expe_NumeroExpediente' })
  expe_NumeroExpediente: number;

  @Column({name: 'expe_Apellidos'})
  expe_Apellidos: number;

  @Column({ name: 'expe_Sexo' }) // Especifica el nombre de la columna en la BD
  expe_Sexo: number;

  @Column({ name: 'expe_IdDoctor' })
  expe_IdDoctor: string;

  @Column({ name: 'expe_FechaNacimiento' })
  expe_FechaNacimiento: Date;

  @Column({ name: 'expe_Nombres' })
  apellexpe_Nombres: string;




  // Agrega aquí otros campos que necesites
}
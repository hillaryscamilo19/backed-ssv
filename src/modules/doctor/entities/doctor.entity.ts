import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity('dbo.s_Doctor') // Nombre de la tabla en la base de datos
export class Doctor {
  @PrimaryGeneratedColumn()
  doct_IdDoctor: string; // ID autogenerado para la entidad


  @Column({ name: 'doct_Nombre' })
  doct_Nombre: string;


  // Días de consulta
  @Column({ name: 'doct_ConsultaDom', default: false })
  doct_ConsultaDom: boolean;

  @Column({ name: 'doct_ConsultaLun', default: false })
  doct_ConsultaLun: boolean;

  @Column({ name: 'doct_ConsultaMar', default: false })
  doct_ConsultaMar: boolean;

  @Column({ name: 'doct_ConsultaMie', default: false })
  doct_ConsultaMie: boolean;

  @Column({ name: 'doct_ConsultaJue', default: false })
  doct_ConsultaJue: boolean;

  @Column({ name: 'doct_ConsultaVie', default: false })
  doct_ConsultaVie: boolean;

  @Column({ name: 'doct_ConsultaSab', default: false })
  doct_ConsultaSab: boolean;
  
  @Column({ name: 'doct_HorIniConDom', nullable: true })
  doct_HorIniConDom: string;

  @Column({ name: 'doct_HorFinConDom', nullable: true })
  doct_HorFinConDom: string;

  @Column({ name: 'doct_HorIniConLun', nullable: true })
  doct_HorIniConLun: string;

  @Column({ name: 'doct_HorFinConLun', nullable: true })
  doct_HorFinConLun: string;

  @Column({ name: 'doct_HorIniConMar', nullable: true })
  doct_HorIniConMar: string;

  @Column({ name: 'doct_HorFinConMar', nullable: true })
  doct_HorFinConMar: string;

  @Column({ name: 'doct_HorIniConMie', nullable: true })
  doct_HorIniConMie: string;

  @Column({ name: 'doct_HorFinConMie', nullable: true })
  doct_HorFinConMie: string;

  @Column({ name: 'doct_HorIniConJue', nullable: true })
  doct_HorIniConJue: string;

  @Column({ name: 'doct_HorFinConJue', nullable: true })
  doct_HorFinConJue: string;

  @Column({ name: 'doct_HorIniConVie', nullable: true })
  doct_HorIniConVie: string;

  @Column({ name: 'doct_HorFinConVie', nullable: true })
  doct_HorFinConVie: string;

  @Column({ name: 'doct_HorIniConSab', nullable: true })
  doct_HorIniConSab: string;

  @Column({ name: 'doct_HorFinConSab', nullable: true })
  doct_HorFinConSab: string;
}
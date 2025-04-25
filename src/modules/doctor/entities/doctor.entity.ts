import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToMany } from 'typeorm';

@Entity('dbo.s_Doctor') // Nombre de la tabla en la base de datos
export class Doctor {
  @PrimaryColumn()
  doct_IdDoctor: string;

  @Column()
  doct_Nombre: string;

  @OneToMany(() => Appointment, (appointment) => appointment.lisp_IdDoctor)
  citas: Appointment[];
  
  // Días de consulta
  @Column({ name: 'doct_ConsultaDom', default: false })
  doct_ConsultaDom: boolean;

  @Column({ name: 'doct_ConsultaLun', default: false })
  doct_ConsultaLun: boolean;

  @Column({name:'doct_Estatus'})
  doct_Estatus: string;

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

  
  @Column({ name: 'doct_CitaDom', nullable: true })
  doct_CitaDom: boolean;
  
  @Column({ name: 'doct_CitaLun', nullable: true })
  doct_CitaLun: boolean;
  
  @Column({ name: 'doct_CitaMar', nullable: true })
  doct_CitaMar: boolean;


  @Column({ name: 'doct_CitaMie', nullable: true })
  doct_CitaMie: boolean;

  @Column({ name: 'doct_CitaJue', nullable: true })
  doct_CitaJue: boolean;

  @Column({ name: 'doct_CitaVie', nullable: true })
  doct_CitaVie: boolean;
  
  @Column({ name: 'doct_CitaSab', nullable: true })
  doct_CitaSab: boolean;

  @Column({ name: 'doct_HorIniCitDom', nullable: true })
  doct_HorIniCitDom: string;
  @Column({ name: 'doct_HorFinCitDom', nullable: true })
  doct_HorFinCitDom: string;

  @Column({ name: 'doct_HorIniCitLun', nullable: true })
  doct_HorIniCitLun: string;

  @Column({ name: 'doct_HorFinConLun', nullable: true })
  doct_HorFinConLun: string;

  @Column({ name: 'doct_HorIniConMar', nullable: true })
  doct_HorIniConMar: string;

  @Column({name: 'doct_HorIniConLun' , nullable: true })
  doct_HorIniConLun: string;

  @Column({name: 'doct_HorIniConMie' , nullable: true})
  doct_HorIniConMie:string;


  @Column({ name: 'doct_HorFinConMar', nullable: true })
  doct_HorFinConMar: string;

  @Column({ name: 'doct_HorIniConMie', nullable: true })
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


  @Column({ name: 'doct_CantCitaDom', nullable: true })
  doct_CantCitaDom: number;

  @Column({ name: 'doct_HorIniConSab', nullable: true })
  doct_CantCitaLun: number;

  @Column({ name: 'doct_CantCitaMar', nullable: true })
  doct_CantCitaMar: number;

  @Column({ name: 'doct_CantCitaMie', nullable: true })
  doct_CantCitaMie: number;

  @Column({ name: 'doct_CantCitaJue', nullable: true })
  doct_CantCitaJue: number;

  @Column({ name: 'doct_CantCitaVie', nullable: true })
  doct_CantCitaVie: number;

  @Column({ name: 'doct_CantCitaSab', nullable: true })
  doct_CantCitaSab: number; 

  @OneToMany(() => Appointment, appointment => appointment.lisp_IdDoctor)
  appointments: Appointment[];
    doctor: any;
}
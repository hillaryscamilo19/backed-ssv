import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { Appointment } from "src/appointments/entities/appointment.entity";

@Entity("dbo.s_Expediente")
export class Patient {
  @PrimaryColumn({ name: 'expe_NumeroExpediente' })
  expe_NumeroExpediente: number;

  @Column()
  expe_Nombres: string;

  @Column()
  expe_Apellidos: string;

  @Column({ nullable: true })
  expe_Sexo: string;

  @Column({ nullable: true })
  expe_EstadoCivil: string;

  @Column({ nullable: true, type: 'datetime' })
  expe_FechaNacimiento: Date;

  @Column({ nullable: true })
  expe_Direccion: string;

  @Column({ nullable: true })
  expe_Sector: string;

  @Column({ nullable: true })
  expe_Ciudad: string;

  @Column({ nullable: true })
  expe_TelefonoCasa: string;

  @Column({ nullable: true })
  expe_TelefonoOficina: string;

  @Column({ nullable: true })
  expe_ExtensionOficina: string;

  @Column({ nullable: true })
  expe_Celular: string;

  @Column({ nullable: true })
  expe_Cedula: string;

  @Column({ nullable: true })
  expe_Ocupacion: string;

  @Column({ nullable: true })
  expe_LugarNacimiento: string;

  @Column({ nullable: true })
  expe_Lee: boolean;

  @Column({ nullable: true })
  expe_Escribe: boolean;

  @Column({ nullable: true })
  expe_Religion: string;

  @Column({ nullable: true })
  expe_ReferidoPor: string;

  @Column({ nullable: true })
  expe_AntecedentesPersonales: string;

  @Column({ nullable: true })
  expe_AntecedentesFamiliares: string;

  @Column({ nullable: true })
  expe_IdSeguroMedico: string;

  @Column({ nullable: true })
  expe_NombreSeguro: string;

  @Column({ nullable: true })
  expe_IdPlanSeguro: string;

  @Column({ nullable: true })
  expe_NumeroAfiliado: string;

  @Column({ nullable: true })
  expe_NumeroPoliza: string;

  @Column({ nullable: true })
  expe_Observacion: string;

  @Column({ nullable: true })
  expe_TieneGlaucoma: boolean;

  @Column({ nullable: true })
  expe_IdDoctor: string;

  @Column({ nullable: true, type: 'datetime' })
  expe_FechaCreacion: Date;

  @Column({ nullable: true })
  expe_IdUsuarioRegistro: string;

  @Column({ nullable: true })
  expe_Email: string;

  @Column({ nullable: true })
  expe_Estatus: string;

  @Column({ nullable: true })
  expe_ArchivoFoto: string;

  @Column({ nullable: true })
  expe_ProblemaRetina: boolean;

  @Column({ nullable: true })
  expe_Escolaridad: string;

  @Column({ nullable: true })
  expe_NombreMadre: string;

  @Column({ nullable: true })
  expe_NombrePadre: string;

  @Column({ nullable: true })
  expe_SecuenciaAnual: number;

  @Column({ nullable: true })
  expe_StsEmailCump: string;

  @Column({ nullable: true, type: 'datetime' })
  expe_FechaEmailCump: Date;

  @Column({ nullable: true })
  expe_ConfEmailUsadaCump: string;

  @Column({ nullable: true })
  expe_Facebook: string;

  @Column({ nullable: true })
  expe_Twitter: string;

  @Column({ nullable: true })
  IdOrig: string;

  @Column({ nullable: true })
  expe_EstatusColor: string;

  @Column({ nullable: true })
  expe_Alerta3: boolean;

  @Column({ nullable: true })
  expe_Alerta4: boolean;

  @Column({ nullable: true })
  expe_CodCiu: string;

  @Column({ nullable: true })
  expe_CodPais: string;

  @Column({ nullable: true })
  expe_Procedencia: string;

  @Column({ nullable: true })
  expe_TipoId: string;

  @Column({ nullable: true, type: 'datetime' })
  expe_FecIniProceso: Date;

  @Column({ nullable: true })
  expe_CantProc: number;

  @Column({ nullable: true })
  expe_Alerta5: boolean;

  @Column({ nullable: true })
  expe_Apodo: string;

  @OneToMany(() => Appointment, (appointment) => appointment.lisp_IdDoctor)
  appointments: Appointment;


  get nombreCompleto(): string {
    return `${this.expe_Nombres} ${this.expe_Apellidos}`;
  }
}
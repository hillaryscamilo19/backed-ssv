import { IsString, IsBoolean, IsDateString, IsEmail, IsNumber, IsOptional } from 'class-validator';

export class PatientDto {
  @IsString()
  expe_NumeroExpediente: number;

  @IsString()
  expe_Nombres: string;

  @IsString()
  expe_Apellidos: string;

  @IsString()
  @IsOptional()
  expe_Sexo?: string;

  @IsString()
  @IsOptional()
  expe_EstadoCivil?: string;

  @IsDateString()
  @IsOptional()
  expe_FechaNacimiento?: string;

  @IsString()
  @IsOptional()
  expe_Direccion?: string;

  @IsString()
  @IsOptional()
  expe_Sector?: string;

  @IsString()
  @IsOptional()
  expe_Ciudad?: string;

  @IsString()
  @IsOptional()
  expe_TelefonoCasa?: string;

  @IsString()
  @IsOptional()
  expe_TelefonoOficina?: string;

  @IsString()
  @IsOptional()
  expe_ExtensionOficina?: string;

  @IsString()
  @IsOptional()
  expe_Celular?: string;

  @IsString()
  @IsOptional()
  expe_Cedula?: string;

  @IsString()
  @IsOptional()
  expe_Ocupacion?: string;

  @IsString()
  @IsOptional()
  expe_LugarNacimiento?: string;

  @IsBoolean()
  @IsOptional()
  expe_Lee?: boolean;

  @IsBoolean()
  @IsOptional()
  expe_Escribe?: boolean;

  @IsString()
  @IsOptional()
  expe_Religion?: string;

  @IsString()
  @IsOptional()
  expe_ReferidoPor?: string;

  @IsString()
  @IsOptional()
  expe_AntecedentesPersonales?: string;

  @IsString()
  @IsOptional()
  expe_AntecedentesFamiliares?: string;

  @IsString()
  @IsOptional()
  expe_IdSeguroMedico?: string;

  @IsString()
  @IsOptional()
  expe_NombreSeguro?: string;

  @IsString()
  @IsOptional()
  expe_IdPlanSeguro?: string;

  @IsString()
  @IsOptional()
  expe_NumeroAfiliado?: string;

  @IsString()
  @IsOptional()
  expe_NumeroPoliza?: string;

  @IsString()
  @IsOptional()
  expe_Observacion?: string;

  @IsBoolean()
  @IsOptional()
  expe_TieneGlaucoma?: boolean;

  @IsString()
  @IsOptional()
  expe_IdDoctor?: string;

  @IsDateString()
  @IsOptional()
  expe_FechaCreacion?: string;

  @IsString()
  @IsOptional()
  expe_IdUsuarioRegistro?: string;

  @IsEmail()
  @IsOptional()
  expe_Email?: string;

  @IsString()
  @IsOptional()
  expe_Estatus?: string;

  @IsString()
  @IsOptional()
  expe_ArchivoFoto?: string;

  @IsBoolean()
  @IsOptional()
  expe_ProblemaRetina?: boolean;

  @IsString()
  @IsOptional()
  expe_Escolaridad?: string;

  @IsString()
  @IsOptional()
  expe_NombreMadre?: string;

  @IsString()
  @IsOptional()
  expe_NombrePadre?: string;

  @IsNumber()
  @IsOptional()
  expe_SecuenciaAnual?: number;

  @IsString()
  @IsOptional()
  expe_StsEmailCump?: string;

  @IsDateString()
  @IsOptional()
  expe_FechaEmailCump?: string;

  @IsString()
  @IsOptional()
  expe_ConfEmailUsadaCump?: string;

  @IsString()
  @IsOptional()
  expe_Facebook?: string;

  @IsString()
  @IsOptional()
  expe_Twitter?: string;

  @IsString()
  @IsOptional()
  IdOrig?: string;

  @IsString()
  @IsOptional()
  expe_EstatusColor?: string;

  @IsBoolean()
  @IsOptional()
  expe_Alerta3?: boolean;

  @IsBoolean()
  @IsOptional()
  expe_Alerta4?: boolean;

  @IsString()
  @IsOptional()
  expe_CodCiu?: string;

  @IsString()
  @IsOptional()
  expe_CodPais?: string;

  @IsString()
  @IsOptional()
  expe_Procedencia?: string;

  @IsString()
  @IsOptional()
  expe_TipoId?: string;

  @IsDateString()
  @IsOptional()
  expe_FecIniProceso?: string;

  @IsNumber()
  @IsOptional()
  expe_CantProc?: number;

  @IsBoolean()
  @IsOptional()
  expe_Alerta5?: boolean;

  @IsString()
  @IsOptional()
  expe_Apodo?: string;
}
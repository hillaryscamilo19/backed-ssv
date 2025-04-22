import { IsString, IsOptional, IsBoolean } from "class-validator"

export class DoctorDto {
  @IsString()
  doct_IdDoctor: string

  @IsString()
  doct_Nombre: string

  @IsString()
  @IsOptional()
  doct_Estatus?: string

  @IsBoolean()
  @IsOptional()
  doct_ConsultaDom?: boolean

  @IsBoolean()
  @IsOptional()
  doct_ConsultaLun?: boolean

  @IsBoolean()
  @IsOptional()
  doct_ConsultaMar?: boolean

  @IsBoolean()
  @IsOptional()
  doct_ConsultaMie?: boolean

  @IsBoolean()
  @IsOptional()
  doct_ConsultaJue?: boolean

  @IsBoolean()
  @IsOptional()
  doct_ConsultaVie?: boolean

  @IsBoolean()
  @IsOptional()
  doct_ConsultaSab?: boolean

  @IsString()
  @IsOptional()
  doct_HorIniConDom?: string

  @IsString()
  @IsOptional()
  doct_HorIniConLun?: string

  @IsString()
  @IsOptional()
  doct_HorIniConMar?: string

  @IsString()
  @IsOptional()
  doct_HorIniConMie?: string

  @IsString()
  @IsOptional()
  doct_HorIniConJue?: string

  @IsString()
  @IsOptional()
  doct_HorIniConVie?: string

  @IsString()
  @IsOptional()
  doct_HorIniConSab?: string

  @IsString()
  @IsOptional()
  doct_HorIniCirDom?: string

  @IsString()
  @IsOptional()
  doct_HorFinCirDom?: string

  @IsString()
  @IsOptional()
  doct_HorFinCirMar?: string

  @IsString()
  @IsOptional()
  doct_HorFinCirMie?: string

  @IsString()
  @IsOptional()
  doct_HorFinCirJue?: string

  @IsString()
  @IsOptional()
  doct_HorFinCirVie?: string

  @IsString()
  @IsOptional()
  doct_HorFinCirSab?: string
}


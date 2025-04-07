import { IsString, IsOptional, IsBoolean } from "class-validator"

export class DoctorDto {
  @IsString()
  id: string

  @IsString()
  nombre: string

  @IsString()
  @IsOptional()
  estatus?: string

  @IsBoolean()
  @IsOptional()
  consultaDom?: boolean

  @IsBoolean()
  @IsOptional()
  consultaLun?: boolean

  @IsBoolean()
  @IsOptional()
  consultaMar?: boolean

  @IsBoolean()
  @IsOptional()
  consultaMie?: boolean

  @IsBoolean()
  @IsOptional()
  consultaJue?: boolean

  @IsBoolean()
  @IsOptional()
  consultaVie?: boolean

  @IsBoolean()
  @IsOptional()
  consultaSab?: boolean

  @IsString()
  @IsOptional()
  horIniConDom?: string

  @IsString()
  @IsOptional()
  horIniConLun?: string

  @IsString()
  @IsOptional()
  horIniConMar?: string

  @IsString()
  @IsOptional()
  horIniConMie?: string

  @IsString()
  @IsOptional()
  horIniConJue?: string

  @IsString()
  @IsOptional()
  horIniConVie?: string

  @IsString()
  @IsOptional()
  horIniConSab?: string

  @IsString()
  @IsOptional()
  horFinConDom?: string

  @IsString()
  @IsOptional()
  horFinConLun?: string

  @IsString()
  @IsOptional()
  horFinConMar?: string

  @IsString()
  @IsOptional()
  horFinConMie?: string

  @IsString()
  @IsOptional()
  horFinConJue?: string

  @IsString()
  @IsOptional()
  horFinConVie?: string

  @IsString()
  @IsOptional()
  horFinConSab?: string
}


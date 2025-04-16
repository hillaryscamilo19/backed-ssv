import { IsString, IsDateString, IsNotEmpty, IsOptional, IsEmail, IsNumber } from "class-validator"

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  cita_IdDoctor: string

  @IsDateString()
  @IsNotEmpty()
  cita_Fecha: string

  @IsString()
  @IsNotEmpty()
  cita_hora: string

  @IsString()
  @IsOptional()
  cita_NumeroExpediente: number

  @IsNumber()
  @IsOptional()
  cita_HoraNumero?: number

  @IsString()
  @IsNotEmpty()
  cita_Nombre: string

  @IsString()
  @IsNotEmpty()
  cita_Apellido: string

  @IsString()
  @IsOptional()
  cita_Telefono?: string

  @IsString()
  @IsOptional()
  cita_Celular?: string

  @IsString()
  @IsOptional()
  cita_IdSeguro?: string

  @IsString()
  @IsOptional()
  cita_IdPlanSeguro?: string

  @IsString()
  @IsOptional()
  cita_Comentario?: string

  @IsString()
  @IsOptional()
  cita_EstatusConf?: string = "PROGRAMADA"

  @IsEmail()
  @IsOptional()
  cita_Email?: string

  @IsString()
  @IsOptional()
  cita_Nota?: string

  @IsString()
  @IsOptional()
  cita_NumeroAfiliado?: string

  @IsString()
  @IsOptional()
  cita_NumeroPoliza?: string

  @IsNumber()
  @IsOptional()
  cita_Prioridad?: number
}
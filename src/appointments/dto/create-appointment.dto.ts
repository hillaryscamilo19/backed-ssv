import { IsString, IsNumber, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAppointmentDto {
  @IsNumber()
  @Type(() => Number)
  cita_IdDoctor: string;

  @IsDate()
  @Type(() => Date)
  cita_Fecha: string;

  @IsDate()
  @Type(() => Date)
  cita_hora: string;

  @IsNumber()
  @Type(() => Number)
  cita_NumeroExpediente: number;

  @IsNumber()
  @Type(() => Number)
  cita_HoraNumero: number;

  @IsString()
  cita_Nombre: string;

  @IsString()
  cita_Apellido: string;

  @IsString()
  cita_Telefono: string;

  @IsNumber()
  @Type(() => Number)
  cita_IdSeguro: number;

  @IsNumber()
  @Type(() => Number)
  cita_IdPlanSeguro: number;

  @IsOptional()
  @IsString()
  cita_Comentario?: string;

  @IsOptional()
  @IsString()
  cita_EstatusConf?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  cita_FechaEstatusConf?: Date;

  @IsOptional()
  cita_RegPorEstatusConf: String ;

  @IsOptional()
  @IsString()
  cita_RegPor?: string;

  @IsDate()
  @Type(() => Date)
  cita_FecReg: Date;

  @IsOptional()
  @IsString()
  cita_Email?: string;

  @IsOptional()
  @IsString()
  cita_StsEmail?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  cita_FechaEmail?: Date;

  @IsOptional()
  @IsString()
  cita_ConfEmailUsada?: string;

  @IsOptional()
  @IsString()
  cita_Nota?: string;

  @IsOptional()
  @IsString()
  IdOrig?: string;

  @IsOptional()
  @IsString()
  NumLista?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  IdConsultorio?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  IdEntidadRef?: number;

  @IsOptional()
  @IsString()
  cita_Celular?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  NumPrecita?: number;

  @IsOptional()
  @IsString()
  cita_NumeroAfiliado?: string;

  @IsOptional()
  @IsString()
  cita_NumeroPoliza?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  cita_Prioridad?: number;
}

import { Type } from 'class-transformer';
import { IsString, IsDateString, IsNumber } from 'class-validator';

export class CreateAppointmentDto {
  @IsNumber()
  lisp_IdDoctor: number;

  @IsDateString()
  lisp_Fecha: string; // <-- CAMBIAR a string y usar IsDateString

  @IsString()
  lisp_Nombre: string;

  @IsString()
  lisP_Apellido: string;

  @IsNumber()
  lisp_NumeroExpediente: number;
}

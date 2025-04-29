
import { Type } from 'class-transformer';
import { IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateAppointmentDto {
  @IsNumber()
  lisp_NumeroExpediente: number;

  @IsNumber()
  lisp_Secuencia: number;

  @IsString()
  lisp_IdDoctor: string;

  @IsString()
  lisp_Nombre: string;

  @IsString()
  lisP_Apellido: string;

  @IsNumber()
  NumLista: number;

  @IsDateString()
  lisp_Fecha: string;
}

import { IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  lisp_NumeroExpediente: string;

  @IsNumber()
  lisp_IdDoctor: number;

  @IsString()
  lisp_Nombre: string;

  
  @IsString()
  lisP_Apellido: string;

  @IsDateString()
  lisp_Fecha: string; // Puede ser string porque Postman manda texto tipo fecha ("2025-04-28")
}

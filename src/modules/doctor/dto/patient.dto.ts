import { IsNumber, IsString, IsEmail, IsOptional } from 'class-validator';

export class PatientDto {
  @IsNumber()
  lisp_IdDoctor: number;

  @IsString()
  lisp_Nombre: string;

  @IsString()
  lisP_Apellido: string;

  @IsString()
  @IsOptional()
  lisp_NumeroExpediente?: string;

  @IsString()
  @IsOptional()
  lisp_Telefono?: string;

  @IsString()
  @IsOptional()
  lisp_Celular?: string;

  @IsEmail()
  @IsOptional()
  lisp_Email?: string;

  // Agrega aquí cualquier otro campo que necesites
}
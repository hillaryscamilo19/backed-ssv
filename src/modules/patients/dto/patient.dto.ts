import { IsString, IsOptional, IsEmail, IsDateString } from "class-validator"

export class PatientDto {
  @IsString()
  nombre: string

  @IsString()
  apellidos: string

  @IsString()
  @IsOptional()
  telefono?: string

  @IsEmail()
  @IsOptional()
  email?: string

  @IsDateString()
  @IsOptional()
  fechaNacimiento?: Date
}


import { IsString, IsDateString, IsNotEmpty } from "class-validator"

export class CreateAppointmentDto {
  @IsDateString()
  fecha: string

  @IsString()
  @IsNotEmpty()
  horaInicio: string

  @IsString()
  @IsNotEmpty()
  horaFin: string

  @IsString()
  @IsNotEmpty()
  doctorId: string

  @IsNotEmpty()
  pacienteId: number
}


import { IsString, IsDateString, IsNotEmpty } from "class-validator"

export class CreateAppointmentDto {
  @IsDateString()
  fecha: string

  @IsString()
  @IsNotEmpty()
  lisp_HoraIniProceso: string

  @IsString()
  @IsNotEmpty()
  lisp_HoraFin: string

  @IsString()
  @IsNotEmpty()
  doct_IdDoctor: string

  @IsNotEmpty()
  lisp_idDoctor: number
}
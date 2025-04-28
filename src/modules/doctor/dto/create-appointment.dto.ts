import { Type } from "class-transformer";
import { IsNumber, IsDate, IsString } from "class-validator";
import { Patient } from "../entities/paciente.entity";

export class CreateAppointmentDto {
    @IsNumber()
      @Type(() => Number)
      lisp_IdDoctor: string;
    
      @IsDate()
      @Type(() => Date)
      lisp_Fecha: string;
    
      @IsDate()
      lisp_Secuencia: string;
    
      @IsNumber()
      @Type(() => Number)
      lisp_NumeroExpediente: Patient;
    
      @IsString()
      lisp_Nombre: string;
    
      @IsString()
      lisP_Apellido: string;
    
      @IsDate()
      @Type(() => Date)
      lisp_HoraLlegada: string;


}
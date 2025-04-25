import { IsString, IsNumber, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { Doctor } from 'src/modules/doctor/entities/doctor.entity';
import { Patient } from 'src/modules/doctor/entities/paciente.entity';

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

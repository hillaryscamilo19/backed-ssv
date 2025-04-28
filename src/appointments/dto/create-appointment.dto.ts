// src/paciente-consulta/dto/paciente-consulta.dto.ts
export class PacienteConsultaDto {
  numeroExpediente: string;
  nombrePaciente: string;
  fechaNacimiento: Date;
  fechaConsulta: Date;
  horaLlegada: string;
  horaInicioConsulta: string;
  nombreDoctor: string;
  especialidadDoctor: string;
  consultorio: string;
}

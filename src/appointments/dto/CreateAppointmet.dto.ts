export class CreateListaPacienteDto {
    lisp_NumeroExpediente: string;
    lisp_IdDoctor: number;
    lisp_Fecha: Date;
    lisp_HoraLlegada?: Date;
    lisp_HoraIniConsulta?: Date;
  }
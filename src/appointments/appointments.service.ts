import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAppointmentDto } from './entities/create-appointment.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}

  async obtenerPacientesPorFecha(
    fecha: string,
  ): Promise<CreateAppointmentDto[]> {
    const resultados = await this.dataSource.query(
      `
        SELECT
          p.lisp_NumeroExpediente AS expe_NumeroExpediente,
          CONCAT(e.expe_Nombres, ' ', e.expe_Apellidos) AS expe_Nombres,
          e.expe_FechaNacimiento AS fechaNacimiento,
          p.lisp_Fecha AS fechaConsulta,
          p.lisp_HoraLlegada AS horaLlegada,
          p.lisp_HoraIniConsulta AS horaInicioConsulta,
          d.doct_Nombre AS nombreDoctor,
          d.doct_DesEspecialidad AS especialidadDoctor,
          d.doct_NumConsultorio AS consultorio
        FROM [Expediente-Test].[dbo].[s_ListaPaciente] p
        INNER JOIN [Expediente-Test].[dbo].[s_Expediente] e
          ON p.lisp_NumeroExpediente = e.expe_NumeroExpediente
        INNER JOIN [Expediente-Test].[dbo].[s_Doctor] d
          ON p.lisp_IdDoctor = d.doct_IdDoctor
        WHERE p.lisp_Fecha = @0
        ORDER BY p.lisp_HoraLlegada ASC
      `,
      [fecha],
    );

    return resultados;
  }

  async asignarDoctorYCita(data: CreateAppointmentDto) {
    const {
      lisp_IdDoctor,
      lisp_Fecha,
      lisp_Nombre,
      lisP_Apellido,
      lisp_NumeroExpediente,
    } = data;

    // 1. Obtener el siguiente número de secuencia disponible
    const resultado = await this.dataSource.query(`
      SELECT ISNULL(MAX(lisp_Secuencia), 0) + 1 AS siguienteSecuencia
      FROM [Expediente].[dbo].[s_ListaPaciente]
    `);
    const siguienteSecuencia = resultado[0].siguienteSecuencia;

    // 2. Insertar en la tabla con el nuevo valor de lisp_Secuencia
    await this.dataSource.query(
      `
      INSERT INTO [Expediente].[dbo].[s_ListaPaciente] (
        lisp_IdDoctor,
        lisp_Fecha,
        lisp_Nombre,
        lisP_Apellido,
        lisp_NumeroExpediente,
        lisp_Secuencia
      ) VALUES (@0, @1, @2, @3, @4, @5)
      `,
      [
        lisp_IdDoctor,
        lisp_Fecha,
        lisp_Nombre,
        lisP_Apellido,
        lisp_NumeroExpediente,
        siguienteSecuencia,
      ],
    );

    return {
      message: 'Paciente asignado al doctor y cita creada exitosamente.',
    };
  }
}

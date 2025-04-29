import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PacienteConsultaDto } from './dto/create-appointment.dto';
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
      lisp_Secuencia,
      NumLista,
    } = data;

    console.log('Recibido en el servicio:', data);
    // Paso 1: Verifica si ya existe el paciente en esa cita
    const yaExiste = await this.dataSource.query(
      `
      SELECT 1
      FROM [Expediente-Test].[dbo].[s_ListaPaciente]
      WHERE lisp_IdDoctor = @0
        AND lisp_Fecha = @1
        AND lisp_NumeroExpediente = @2
        AND lisp_Secuencia = @3
      `,
      [lisp_IdDoctor, lisp_Fecha, lisp_NumeroExpediente, lisp_Secuencia],
    );


    if (yaExiste.length > 0) {
      throw new Error(
        'Este paciente ya tiene asignada una cita con este doctor en esa fecha y secuencia.',
      );
    }

    // Paso 2: Obtener el siguiente NumLista disponible para ese doctor y fecha
    const resultado = await this.dataSource.transaction(async (manager) => {
      const [{ nextNumLista }] = await manager.query(`
        SELECT ISNULL(MAX(NumLista), 0) + 1 AS nextNumLista
        FROM [Expediente-Test].[dbo].[s_ListaPaciente]
        WITH (TABLOCKX)
        WHERE lisp_IdDoctor = @0 AND lisp_Fecha = @1
      `, [lisp_IdDoctor, lisp_Fecha]);
    
      return nextNumLista;
    });
    

    const nextNumLista = resultado?.nextNumLista ?? 1;

    // Paso 3: Insertar nuevo paciente en la lista
    await this.dataSource.query(
      `
      INSERT INTO [Expediente-Test].[dbo].[s_ListaPaciente] (
        lisp_IdDoctor,
        lisp_Fecha,
        lisp_Nombre,
        lisP_Apellido,
        lisp_NumeroExpediente,
        lisp_Secuencia,
        NumLista
      ) VALUES (@0, @1, @2, @3, @4, @5, @6)
      `,
      [
        lisp_IdDoctor,
        lisp_Fecha,
        lisp_Nombre,
        lisP_Apellido,
        lisp_NumeroExpediente,
        lisp_Secuencia,
        NumLista,
      ],
    );
  }
}

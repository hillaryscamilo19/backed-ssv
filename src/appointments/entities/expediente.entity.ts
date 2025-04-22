import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Appointment } from './appointment.entity';


@Entity('dbo.s_Expediente')
export class Expediente {
  @PrimaryColumn()
  expe_NumeroExpediente: number;

  @Column()
  expe_Nombres: string;

  @Column()
  expe_Apellidos: string;

  @OneToMany(() => Appointment, (appointment) => appointment.paciente)
  citas: Appointment[];

  // Agrega más columnas según necesites
}

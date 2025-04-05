import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Usuarios') // Asegúrate de usar el nombre exacto de tu tabla en SQL Server
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @Column({ nullable: true })
  telefono: string;
}
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  nombre: string;

  @Column({ nullable: true })
  apellido: string;

  @Column({ default: true })
  activo: boolean;
}
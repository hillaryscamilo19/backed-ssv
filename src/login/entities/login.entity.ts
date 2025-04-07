import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Usuarios')
export class Usuarioss {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  nombre: string;

  @Column({ default: true })
  apellido: string;

  @Column({ default: true })
  activo: boolean;
}
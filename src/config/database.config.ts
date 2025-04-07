import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mssql',
  host: 'SRV-EXP',
  port: 1433,
  username: 'expediente',
  password: 'B1Admin',
  database: 'Expediente-Test',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  logging: true,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};
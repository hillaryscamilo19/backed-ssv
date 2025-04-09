// In your app.module.ts or database configuration file
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsModule } from './modules/doctor/doctors.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'SRV-EXP', 
      database: 'Expediente-Test', 
      username: 'sa', 
      password: 'B1Admin', 
      options: {
        encrypt: false, 
        trustServerCertificate: true,
      },
      synchronize: false, 
      logging: true, 
      entities: ['dist/**/*.entity{.ts,.js}'], 
    }),
    DoctorsModule

  ],
})
export class AppModule {}
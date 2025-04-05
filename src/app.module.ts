import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'SRV-EXP',
      port: 1433, 
      username: 'sa',
      password: 'B1Admin',
      database: 'ExpedienteTest',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, 
      options: {
        trustServerCertificate: true,
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors(
    {
      origin: 'http://localhost:4200', 
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    }
    
  )
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )
  app.setGlobalPrefix('api');
  await app.listen(3001)
  console.log(`Aplicación ejecutándose en: http://localhost:192.0.0.15:3001`)
}
bootstrap()


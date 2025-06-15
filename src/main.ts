import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, //incomming response will be transformed to the DTO type
    }
  ))

  /**
   * Swagger Configuration
   */
  const config = new DocumentBuilder()
  .setTitle('NestJS API Blog app API ')
  .setDescription('The NestJS API Blog app API description. use the base API as http://localhost:12000')
  .setTermsOfService('http://localhost:12000/terms-of-service')
  .setLicense('MIT', 'https://opensource.org/license/mit/')
  .addServer('http://localhost:12000', 'Development Server')
  .setVersion('1.0').build();
  // Instantiate Document
  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api',app,document);



  // await app.listen(process.env.PORT ?? 12000);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

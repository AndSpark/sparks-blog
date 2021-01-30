import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  const options = new DocumentBuilder()
  .setTitle('Conduit Blog API')
  .setDescription('Conduit blog api')
  .setVersion('1.0.0')
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT_HTTP);
  console.log(process.env.BASE_URL_HTTP + '/api');
}
bootstrap();

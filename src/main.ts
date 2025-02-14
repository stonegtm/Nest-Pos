import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ENV } from './common/env/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0.0')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'Api-Key',
        in: 'header',
      },
      'Api-Key',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'Token',
    )
    .addSecurity('Api-Version', {
      type: 'apiKey',
      name: 'X-Api-Version',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  console.log("===============>>>>>", process.env.NODE_ENV)
  // console.log("===============>>>>>", ENV().HOST)
  console.log('===============>>>>>', process.env.URL_API);
  app.enableCors();
  await app.listen(9000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api/v1');
	app.enableCors({
		origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000"
    ],
		credentials: true,
	});

	if (process.env.ENV == "dev") {
		const config = new DocumentBuilder()
		.setTitle('Subway Talk for Busan')
		.setDescription('Subway Talk APIs description')
		.setVersion('1.0.0')
		.build();

		const document = SwaggerModule.createDocument(app, config);
		SwaggerModule.setup('docs', app, document);
	}
	await app.listen(process.env.PORT);
}
bootstrap();

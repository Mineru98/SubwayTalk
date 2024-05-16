import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { typeOrmConfigAsync } from './config/data.config';
import { UserModule } from './modules/user/user.module';
import { RoomModule } from './modules/room/room.module';
import { BannerModule } from './modules/banner/banner.module';
import { SharedModule } from './shared/shared.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env.dev" }),
		TypeOrmModule.forRootAsync(typeOrmConfigAsync),
		ServeStaticModule.forRoot({
		  rootPath: join(__dirname, '..', 'static'),
		  exclude: ['/api/(.*)'],
		}),
		// infrastructure
		SharedModule,
		// Application
		UserModule,
		RoomModule,
		BannerModule

	],
	controllers: [],
	providers: [],
})
export class AppModule {}
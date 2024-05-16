import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Room } from '../../entities/room.entity';

@Module({
	imports: [TypeOrmModule.forFeature([User, Room])],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService, TypeOrmModule],
})
export class UserModule {}
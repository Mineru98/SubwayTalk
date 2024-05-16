import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../entities/user.entity';
import { Room } from '../../entities/room.entity';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
	private readonly logger = new Logger(UserService.name);
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
		@InjectRepository(Room)
		private roomsRepository: Repository<Room>,
	) {}

	//Register User
	async create(createUserDto: CreateUserDto): Promise<void> {
		const { ...data } = createUserDto;
		await this.usersRepository
			.createQueryBuilder()
			.insert()
			.values({  ...data })
			.execute();
	}

	// Find One USER using username
	async findOne(username: string): Promise<any> {
		return await this.usersRepository.findOneBy({ username });
	}

	async updateUserRoom(userId: string, room: Room): Promise<void> {

	}
}
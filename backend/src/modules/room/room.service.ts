import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddMessageDto } from '../message/dto';
import { Room } from '../../entities/room.entity';

@Injectable()
export class RoomService {
	private readonly logger = new Logger(RoomService.name);
	constructor(
		@InjectRepository(Room)
		private roomsRepository: Repository<Room>,
	) {}

	async findAll(): Promise<Array<Room>> {
		return await this.roomsRepository.find({ relations: ["messages"], take: 5 });
	}
	
	async findOne(roomId: string) {
		const room = await this.roomsRepository.findOneBy({ roomId });
	
		if (!room) {
		  throw new NotFoundException(`There is no room under id ${roomId}`);
		}
	
		return room;
	}

	async findOneWithRelations(roomId: string): Promise<Room> {
		return await this.roomsRepository.findOneBy({ roomId });
	}
	

	async addMessage(addMessageDto: AddMessageDto): Promise<void> {

	}
}
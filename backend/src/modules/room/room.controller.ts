import { Controller, Get, Param } from '@nestjs/common';
import { RoomService } from './room.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('room')
export class RoomController {
	constructor(private readonly roomService: RoomService) {}
  
	@ApiTags("room")
	@Get(':id')
	async findOne(@Param('id') id: string) {
	  return this.roomService.findOne(id);
	}
  
	@ApiTags("room")
	@Get()
	async getAllRooms() {
	  return this.roomService.findAll();
	}
}
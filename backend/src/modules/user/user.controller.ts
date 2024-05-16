import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	// Registe
	@ApiTags("user")
	@Post()
	async create(@Body() createUserDto: CreateUserDto) {}
}
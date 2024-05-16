import { Column, Entity, JoinTable, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CreateUserDto, UserDto } from '../modules/user/dto';
import { Room } from "../entities/room.entity";
import { Message } from "./message.entity";

export enum UserRole {
	ADMIN = 'admin',
	USER = 'user',
}

@Entity('users')
export class User implements UserDto, CreateUserDto {
	@PrimaryGeneratedColumn('uuid')
	id: number;

	@Column({
		name: 'username',
		type: 'varchar',
		length: 30,
		unique: true,
	})
	username: string;

	@Column({
		name: 'ip',
		type: 'varchar',
	})
	ip: string;

	@Column({
		name: 'role',
		type: 'enum',
		enum: UserRole,
		default: UserRole.USER,
	})
	role: UserRole;

	@JoinTable()
	@ManyToOne(() => Room, (room: Room) => room.users)
	room: Room;

	@OneToMany(() => Message, (message: Message) => message.user)
	messages: Array<Message>;
}
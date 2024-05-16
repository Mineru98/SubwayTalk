import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from "../entities/user.entity";
import { Message } from "./message.entity";
import { Banner } from './banner.entity';
import { RoomDto, EnterRoomDto } from '../modules/room/dto';

@Entity('rooms')
export class Room implements RoomDto, EnterRoomDto {
	@PrimaryGeneratedColumn('uuid')
	roomId: string;

    @OneToMany(() => User, (user: User) => user.room)
    users: Array<User>;

    @OneToMany(() => Message, (message: Message) => message.room)
    messages: Array<Message>;

    @OneToMany(() => Banner, (banner: Banner) => banner.room)
    banners: Array<Banner>;
}
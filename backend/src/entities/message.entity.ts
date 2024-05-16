import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinTable
  } from 'typeorm';
import { Room } from "./room.entity";
import { User } from "./user.entity";

export enum MessageType {
	BASIC = 'basic',
	ACTION = 'action',
}

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 250 })
  text: string;

	@Column({
		name: 'message_type',
		type: 'enum',
		enum: MessageType,
		default: MessageType.BASIC,
	})
	messageType: MessageType;

  @CreateDateColumn()
  created_at: Date;

  @JoinTable()
  @ManyToOne(() => Room, (room: Room) => room.messages)
  room: Room;

  @JoinTable()
  @ManyToOne(() => User, (user: User) => user.messages)
  user: User;
}
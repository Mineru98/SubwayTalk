import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinTable,
  } from 'typeorm';
  import { Room } from "./room.entity";
import { BannerDto, CreateBannerDto } from '../modules/banner/dto';

@Entity('banners')
export class Banner implements BannerDto, CreateBannerDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 250 })
  text: string;

  @CreateDateColumn()
  created_at: Date;

  @JoinTable()
  @ManyToOne(() => Room, (room: Room) => room.banners)
  room: Room;
}
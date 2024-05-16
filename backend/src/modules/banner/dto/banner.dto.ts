import { Room } from "src/entities/room.entity";

export interface BannerDto {
    id: string;
    text: string;
    room: Room;
}

export interface CreateBannerDto {
    text: string;
    room?: Room;
}
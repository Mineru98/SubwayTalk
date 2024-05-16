export interface AddMessageDto {
    text: string;
    roomId: string;
    userId: string;
}

export interface JoinRoomDto {
    roomId: string;
}

export interface LeaveRoomDto {
    roomId: string;
}
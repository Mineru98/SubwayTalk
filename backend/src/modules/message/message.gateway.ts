import { UsePipes, ValidationPipe } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AddMessageDto, JoinRoomDto, LeaveRoomDto } from './dto';
import { RoomService } from '../room/room.service';
import { UserService } from '../user/user.service';

@UsePipes(new ValidationPipe())
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server;

  connectedUsers: Map<string, string> = new Map();

  constructor(
    private readonly userService: UserService,
    private readonly roomService: RoomService,
  ) {}

  async handleConnection(client: Socket): Promise<void> {
    const user = (await this.userService.findOne(""));

    if (!user) {
      client.disconnect(true);

      return;
    }
    const room = user.room;

    this.connectedUsers.set(client.id, user.id);

    if (room) {
      return this.onRoomJoin(client, { roomId: room.id });
    }
  }

  async handleDisconnect(client: Socket) {
    this.connectedUsers.delete(client.id);
  }

  @SubscribeMessage('message')
  async onMessage(client: Socket, addMessageDto: AddMessageDto) {
    const userId = this.connectedUsers.get(client.id);
    const user = await this.userService.findOne(userId);

    if (!user.room) {
      return;
    }

    addMessageDto.userId = userId;
    addMessageDto.roomId = user.room.id;

    await this.roomService.addMessage(addMessageDto);

    client.to(user.room.id).emit('message', addMessageDto.text);
  }

  @SubscribeMessage('join')
  async onRoomJoin(client: Socket, joinRoomDto: JoinRoomDto) {
    const { roomId } = joinRoomDto;
    const limit = 10;

    const room = await this.roomService.findOneWithRelations(roomId);

    if (!room) return;

    const userId = this.connectedUsers.get(client.id);
    const messages = room.messages.slice(limit * -1);

    await this.userService.updateUserRoom(userId, room);

    client.join(roomId);

    client.emit('message', messages);
  }

  @SubscribeMessage('leave')
  async onRoomLeave(client: Socket, leaveRoomDto: LeaveRoomDto) {
    const { roomId } = leaveRoomDto;
    const userId = this.connectedUsers.get(client.id);

    await this.userService.updateUserRoom(userId, null);

    client.leave(roomId);
  }
}
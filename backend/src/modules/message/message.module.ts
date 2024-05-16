import { Module } from '@nestjs/common';

import { ChatGateway } from './message.gateway';
import { UserModule } from '../user/user.module';
import { RoomModule } from '../room/room.module';

@Module({
  imports: [UserModule, RoomModule],
  providers: [ChatGateway],
})
export class ChatModule {}
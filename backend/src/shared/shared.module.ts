import { Module } from '@nestjs/common';
import { OpenAPIModule } from './openapi/openapi.module';
@Module({
  imports: [
    OpenAPIModule,
  ],
})
export class SharedModule {}
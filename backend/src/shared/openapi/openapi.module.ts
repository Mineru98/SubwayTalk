import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { OpenAPIService } from './openapi.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [OpenAPIService],
  exports: [OpenAPIService],
})
export class OpenAPIModule {}
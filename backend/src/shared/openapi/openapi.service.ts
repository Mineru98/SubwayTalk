import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class OpenAPIService {
  private readonly env: string;
  constructor(
    private readonly configSvc: ConfigService,
    private readonly httpSvc: HttpService,
  ) {
  }
}
import { Controller, Get, Param } from '@nestjs/common';
import { BannerService } from './banner.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('banner')
export class BannerController {
	constructor(private readonly bannerService: BannerService) {}
  
	@Get()
	@ApiTags("banner")
	async getBannerAll() {
	  return this.bannerService.findAll();
	}
}
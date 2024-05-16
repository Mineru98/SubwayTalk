import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Banner } from '../../entities/banner.entity';

@Injectable()
export class BannerService {
	private readonly logger = new Logger(BannerService.name);
	constructor(
		@InjectRepository(Banner)
		private bannersRepository: Repository<Banner>,
	) {}

	async findAll(): Promise<Array<Banner>> {
		return await this.bannersRepository.find({ take: 5 });
	}
}
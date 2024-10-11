import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { DomainService } from './domain.service';

@Controller('api/domain')
export class DomainController {
    constructor(private readonly domainService: DomainService) {}

    @Get('data')
    async getData(@Query('domain') domain: string) {
        console.log("🚀 ~ DomainController ~ getData ~ domain:", domain);

        if (!domain) {
            throw new HttpException('Domain parameter is required.', HttpStatus.BAD_REQUEST);
        }

        try {
            const data = await this.domainService.fetchData(domain);
            console.log("🚀 ~ DomainController ~ getData ~ data:", data);
            return data;
        } catch (error) {
            console.error('Error in getData:', error.message);
            throw new HttpException(`Error fetching data for domain: ${domain}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

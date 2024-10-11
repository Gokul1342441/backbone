import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, retry } from 'rxjs';

@Injectable()
export class DomainService {
    constructor(private readonly httpService: HttpService) {}

    async fetchData(domain: string): Promise<any> {
        const url = `https://crt.sh/?q=%25.${domain}&output=json`;
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
            'Accept': 'application/json',
        };

        try {
            const response = await lastValueFrom(
                this.httpService.get(url, { headers }).pipe(
                    retry(3)
                )
            );
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch data for domain ${domain}: ${error.message}`);
        }
    }
}

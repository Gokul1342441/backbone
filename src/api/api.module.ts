import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DomainService } from './domain/domain.service';
import { DomainController } from './domain/domain.controller';

@Module({
  imports: [HttpModule],  // Import HttpModule here
  controllers: [DomainController],
  providers: [DomainService],
})
export class ApiModule {}  // or DomainModule

import { Module } from '@nestjs/common';
import { CbController } from './cb.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [CbController],
})
export class CbModule {}

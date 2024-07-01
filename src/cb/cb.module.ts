import { Module } from '@nestjs/common';
import { CbController } from './cb.controller';

@Module({
  controllers: [CbController]
})
export class CbModule {}

import { Module } from '@nestjs/common';
import { CbModule } from './cb/cb.module';

@Module({
  imports: [CbModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

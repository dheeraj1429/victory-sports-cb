import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';

@Controller('cb')
export class CbController {
  protected readonly logger = new Logger(CbController.name);

  @Post('/')
  @HttpCode(HttpStatus.OK)
  async testingCb(@Body() body: any) {
    this.logger.log(body);
    return { success: 200 };
  }
}

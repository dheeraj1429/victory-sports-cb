import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

type RequestType = 'balance' | 'debit' | 'credit';

interface BalancePayload {
  userid: string;
  currency: string;
  i_extparam: string;
  i_gamedesc: string;
  hmac: string;
}

interface DebitPayload {
  tid: string | number;
  userid: string;
  currency: string;
  amount: string;
  i_gameid: string;
  i_extparam: string;
  i_gamedesc: string;
  i_actionid: string;
  hmac: string;
}

interface CreditPayload {
  tid: string | number;
  userid: string;
  currency: string;
  amount: string;
  i_gameid: string;
  i_extparam: string;
  i_rollback: string;
  i_gamedesc: string;
  i_actionid: string;
  game_extra: string;
  hmac: string;
}

interface CbBody {
  type: RequestType;
}

@Controller('cb')
export class CbController {
  protected readonly logger = new Logger(CbController.name);

  constructor(private readonly httpService: HttpService) {}

  @Post('/')
  @HttpCode(HttpStatus.OK)
  async cb(
    @Body() body: CbBody & BalancePayload & DebitPayload & CreditPayload,
  ) {
    this.logger.log(body);

    if (body.type === 'balance') {
      const { data } = await firstValueFrom(
        this.httpService
          .get(
            `${process.env.API_MAIN_BACKEND_URI}v1/user/fundist/get-user-blc?userId=${body.userid}&currency=${body.currency}`,
          )
          .pipe(
            catchError((error: AxiosError) => {
              this.logger.error(error.response.data);
              throw 'An error happened!';
            }),
          ),
      );
      return data;
    } else if (body.type === 'credit') {
      const { data } = await firstValueFrom(
        this.httpService
          .post(
            `${process.env.API_MAIN_BACKEND_URI}v1/user/fundist/credit-user`,
            body,
          )
          .pipe(
            catchError((error: AxiosError) => {
              this.logger.error(error.response?.data || error.message);
              throw new Error('An error occurred while crediting user');
            }),
          ),
      );
      return data;
    } else if (body.type === 'debit') {
      const { data } = await firstValueFrom(
        this.httpService
          .post(
            `${process.env.API_MAIN_BACKEND_URI}v1/user/fundist/debit-user`,
            body,
          )
          .pipe(
            catchError((error: AxiosError) => {
              this.logger.error(error.response?.data || error.message);
              throw new Error('An error occurred while debit user');
            }),
          ),
      );
      return data;
    }
  }
}

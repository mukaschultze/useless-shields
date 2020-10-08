import { Controller, Get, Headers, Ip, Redirect } from '@nestjs/common';
import * as express from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get('ip')
  @Redirect()
  getIp(
    @Ip() requestIp: express.Request['ip'],
    @Headers('x-appengine-user-ip') headerIP: string,
  ) {
    const ip = headerIP || requestIp;
    const uriLabel = 'Your IP';
    const uriIp = encodeURI(ip);
    const shieldUrl = `https://img.shields.io/static/v1?label=${uriLabel}&message=${uriIp}&color=red`;

    return {
      url: shieldUrl,
      statusCode: 302,
    };
  }

  @Get('geo')
  @Redirect()
  async getGeo(
    @Ip() requestIp: express.Request['ip'],
    @Headers('x-appengine-user-ip') headerIP: string,
  ) {
    const ip = headerIP || requestIp;
    const uriLabel = 'Shout out';
    const geo = await this.appService.getGeoIp(ip);
    const uriLocation = encodeURI(`${geo.city}, ${geo.region}`);
    const shieldUrl = `https://img.shields.io/static/v1?label=${uriLabel}&message=${uriLocation}&color=red`;

    return {
      url: shieldUrl,
      statusCode: 302,
    };
  }
}

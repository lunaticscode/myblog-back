import { Controller, Get, Req, Request, Post, Body, Res, Response, Param, UseGuards,  } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport'
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService, 
    ) {}

    //@UseGuards( LocalAuthGuard )
    //@Post('/login')
    //async login( @Request() req ){
      //console.log(req);
      //return req.user;
    //}
}


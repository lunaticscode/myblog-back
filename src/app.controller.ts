import { Controller, Get, Req, Request, Post, Body, Res, Response, Param, UseGuards,  } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport'
import { LocalAuthGuard } from './auth/local-auth.guard';
import * as session from 'express-session';

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService, 
    ) {}
  
}

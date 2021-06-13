import { Controller, Get, Req, Request, Post, Res, Param, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller() // 공통 주소
export class AppController {
  constructor(
      private readonly appService: AppService, 
      private readonly authService : AuthService
    ) {}

  @Get() // 세부 주소
  getHello( @Req() req: Request, @Res() res: Response ): string {
    return this.appService.getHello();
  }

  @Get('/articles')
  getPost(): string{
    return this.appService.getArticles();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login( @Request() req){
    console.log(req.body);
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile( @Request() req ) {
    return req.user;
  }
}

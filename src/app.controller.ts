import { Controller, Get, Req, Request, Post, Res, Param, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
@Controller() // 공통 주소
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // 세부 주소
  getHello( @Req() req: Request, @Res() res: Response ): string {
    return this.appService.getHello();
  }

  @Get(":id")
  getItemById( @Param('id') id ) : string {
    return this.appService.getItemById(id);
  }

  @Get('/articles')
  getPost(): string{
    return this.appService.getArticles();
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login( @Request() req){
    console.log(req.body);
    return req.user;
  }
}

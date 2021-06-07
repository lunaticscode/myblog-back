import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // 공통 주소
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // 세부 주소
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/articles')
  getPost(): string{
    return this.appService.getArticles();
  }
}

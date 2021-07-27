import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity'
import { ArticleController } from './article.controller'
import { MyauthModule } from '../myauth/myauth.module';
@Module({
  imports: [ TypeOrmModule.forFeature([ Article ]), MyauthModule ],
  controllers: [ ArticleController ],
  providers: [ArticleService]
})
export class ArticleModule {}

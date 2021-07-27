import { Controller, Get, Req, Post, Body, Res, Param, UseGuards, HttpStatus  } from '@nestjs/common';
import { Request, Response } from 'express'
import { ArticleService } from './article.service';
import { Article } from './article.entity';

@Controller('/article')
export class ArticleController {
  constructor(
      private readonly articleService: ArticleService, 
    ) {}

    @Get('/list')
    async getAllArticle( @Req() req: Request, @Res() res: Response ){
        const result = await this.articleService.getAllArticle();
        
        res.status(HttpStatus.OK).json( { res: 20000, list: result } )
    }
    
    @Get('/count')
    async getAllArticleCnt( @Res() res: Response ) {
        const result = await this.articleService.getAllArticleCnt();
        res.status(HttpStatus.OK).json({ res: 20000, count: result })
    }
    
    @Post('/create')
    async createArticle( @Req() req: Request, @Res() res: Response ) {
        
    }
}



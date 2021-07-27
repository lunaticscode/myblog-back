import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { MyauthService } from '../myauth/myauth.service';
@Injectable()
export class ArticleService {

    constructor(
        @InjectRepository(Article)
        private readonly articleRepo: Repository<Article>,
        private myauthService : MyauthService,
    ){}
    
    async getAllArticle( ): Promise<Article[]>{
        return await this.articleRepo.find();
    }
    
    async getAllArticleCnt(){
        return await this.articleRepo.count();
    }
    
    async createArticle( tokenValue: string ) {
        return await this.myauthService.validateAdminToken( tokenValue );
    }
    
}
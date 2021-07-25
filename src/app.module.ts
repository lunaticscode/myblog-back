import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm'

import { UsersModule } from './users/users.module';
import { User } from './users/users.entity'
import { ArticleModule } from './article/article.module';
import { Article } from './article/article.entity'
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service'
import { MyauthModule } from './myauth/myauth.module';

@Module({
  imports: [
              ConfigModule.forRoot({
                envFilePath: '.env',
                isGlobal: true,
                ignoreEnvFile: false,
              }), 
              TypeOrmModule.forRoot({
                "type": "mysql",
                "host": process.env.MYSQL_HOST,
                "port": parseInt(process.env.MYSQL_PORT),
                "username": process.env.MYSQL_USERNAME,
                "password": process.env.MYSQL_PASSWORD,
                "database": process.env.MYSQL_DATABASE,
                "entities": [ User, Article ],
                "synchronize": ( process.env.MODE === "LOCAL" )
              }),
              UsersModule,
              ArticleModule,
              AuthModule,
              MyauthModule,
            ],
  controllers: [AppController],
  providers: [
      AppService
  ],
})

export class AppModule {
  constructor( private connection: Connection ){}
}

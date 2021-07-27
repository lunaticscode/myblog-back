import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity'
import { Session } from 'express-session';
//import { UserSchema } from './users.schema'
import { UsersController } from './users.controller'
import { MyauthModule } from '../myauth/myauth.module';

@Module({
  imports: [ TypeOrmModule.forFeature([ User ]), MyauthModule ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})

export class UsersModule {}

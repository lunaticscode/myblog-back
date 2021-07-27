import { Module } from '@nestjs/common';
import { MyauthService } from './myauth.service';
//import { UsersModule } from '../users/users.module'
import { MyauthController } from './myauth.controller';
@Module({
  providers: [ MyauthService ],
  exports: [ MyauthService ],
  controllers: [ MyauthController ],
})
export class MyauthModule {}

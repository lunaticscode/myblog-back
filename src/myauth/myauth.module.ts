import { Module } from '@nestjs/common';
import { MyauthService } from './myauth.service';
//import { UsersModule } from '../users/users.module'
@Module({
  providers: [ MyauthService ],
  exports: [ MyauthService ],
})
export class MyauthModule {}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
      UsersModule, 
      PassportModule,
      // JwtModule.register({
      //   secret: jwtConstants.secret,
      //   signOptions: { expiresIn: '60s' }
      // })
      JwtModule.registerAsync({
        imports: [ ConfigModule ],
        inject: [ConfigService],
        useFactory: async ( configService: ConfigService ) => ({
          secret: configService.get('SECRET'),
        })
      })
    ],
  providers: [ AuthService, LocalStrategy, JwtStrategy, ConfigService ],
  exports: [ AuthService ]
})

export class AuthModule {}

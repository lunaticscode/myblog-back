import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor( configService: ConfigService ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            //secretOrKey: jwtConstants.secret,
            secretOrKey: configService.get('SECRET')
        })
        console.log( configService.get('SECRET') );
    }

    async validate( payload: any ) {
         return { userId: payload.sub, username: payload.username };
    }
}

import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor( private authService: AuthService ){
        super();
    }
// code : string
    async validate( username: string, password: string ): Promise<any> {
        console.log( 'local.startegy.ts ::: validate() exec' );
        const admin = await this.authService.validateUser( username, password );
        //const admin = await this.authService.validateUser( code );
        console.log( 'local.startegy.ts ::: validateUser() => return user' );
        console.log( 'user => ', admin );
        if( !admin  ){
            throw new UnauthorizedException();
        }
        return admin;
    }
}
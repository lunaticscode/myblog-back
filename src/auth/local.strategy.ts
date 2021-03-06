import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor( private authService: AuthService ){
        super();
    }   

    async validate(id: string, password: string): Promise<any>{
        console.log(id)
        const admin = await this.authService.validateAdmin(id, password);
        if( !admin ){
            throw new UnauthorizedException();
        }
        return admin;
    }
}
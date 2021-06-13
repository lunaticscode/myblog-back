import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
            private usersService: UsersService,
            private jwtService: JwtService
        ){}

    async validateUser(username: string, pass: string) : Promise<any> {
        console.log( 'auth.service.ts ::: validateUser() exec' )
        const user = await this.usersService.findOne( username );
        console.log( 'auth.service.ts ::: validateUser() ::: findOne() => return user' );
        console.log( 'auth.service.ts ::: user => ', user);
        if( user && user.password === pass ){
            const { password, ...result } = user;
            //* 실제 로그인 성공 시, 반환되는 부분
            return result;
        }
        return null;
    }
    // async validateUser( code: string ) : Promise<any> {
    //     console.log( 'auth.service.ts ::: validateUser() exec' )
    //     const admin = await this.usersService.findOne( code );
    //     console.log( 'auth.service.ts ::: validateUser() ::: findOne() => return user' );
    //     console.log( 'auth.service.ts ::: user => ', admin);
    //     if( admin && admin.code === code ){
    //         const { code, ...result } = admin;
    //         //* 실제 로그인 성공 시, 반환되는 부분
    //         return result;
    //     }
    //     return null;
    // }

    async login( user: any ){
        const payload = { code: user.username, sub: user.userId }  
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    // async login( admin: any ){
    //     const payload = { admin: admin.code }  
    //     return {
    //         access_token: this.jwtService.sign(payload),
    //     };
    
    // }
}

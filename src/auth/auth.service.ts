import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService){}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne( username );
        if( user && user.password === pass ){
            const { password, ...result } = user;
            //* 실제 로그인 성공 시, 반환되는 부분
            return result;
        }
        return null;
    }
}

import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
    
    constructor( private usersService: UsersService ){}
    
    async validateAdmin( id: string, password: string) : Promise<any>{
        console.log('validateAdmin() ::: id => ', id);
        // const adminInfo = await this.usersService.findAdmin(id);
        // console.log(adminInfo);
        // return adminInfo;
    }

}

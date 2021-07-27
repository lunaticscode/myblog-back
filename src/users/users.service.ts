import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdvancedConsoleLogger, Repository } from 'typeorm'
import { User } from './users.entity';
import { MyauthService } from '../myauth/myauth.service';
import { API_RESULT } from '../_common'; 

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private myAuthService : MyauthService,        
        ) {}
         
    async getAllUsers(): Promise<User[]>{
        return await this.userRepository.find()
    } 

    async createDummy(): Promise<void> {
        const result = await this.userRepository.save({id: 'hw-admin1', password:'test1234'})
        console.log(result);
    }

    async createAdmin(info): Promise<boolean> {
        const result = await this.userRepository.save(info);
        console.log(result);
        return true;
    }

    async loginAdmin( id: string, pw: string ): Promise<User | object >{
        console.log( 'findAdmin() ::: id => ', id );
        const findResult = await this.userRepository.findOne({ id: id });
        console.log('findResult => ', findResult);
        if( findResult ){
            const valideResult = await this.myAuthService.validateAdminPassword( pw, findResult.password );
            if( !valideResult['result'] ){
                switch( valideResult['type'] ){
                    case 'password':
                        return { res: API_RESULT.FAIL, msg: "invalid password" }
                    case 'token':
                        return { res: API_RESULT.FAIL, msg: "invalid token" }        
                    default:
                        return { res: API_RESULT.FAIL, msg: "error" }
                }      
            }
            return { res: API_RESULT.SUCCESS, token: valideResult['token'] };
        }
        return { res: API_RESULT.FAIL }; 
    }
    
}

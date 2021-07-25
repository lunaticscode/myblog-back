import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { User } from './users.entity';
import { MyauthService } from '../myauth/myauth.service';

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

    async findAdmin( id: string, pw: string ): Promise<User | undefined >{
        console.log( 'findAdmin() ::: id => ', id );
        const findResult = await this.userRepository.findOne({ id: id });
        if( findResult ){
            const valideResult = await this.myAuthService.validateAdminPassword( pw, findResult.password );
            console.log(valideResult);
        }
        return findResult; 
    }
    
}

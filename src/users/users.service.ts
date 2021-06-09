import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {

    private readonly users = [
        {
            userId: 1,
            username: 'john',
            password: '1234',
        },
        {
            userId: 2,
            username: 'maria',
            password: '12345',
        },
    ];
    
    async findOne( username: string ): Promise<User | undefined> {
        // find() : 해당 조건에 맞는 배열 원소 반환
        return this.users.find(user => user.username === username);
    }
}

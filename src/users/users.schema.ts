import { EntitySchema } from 'typeorm';
import { User } from './users.entity';

export const UserSchema = new EntitySchema<User>({
    name: 'User',
    target: User,
    columns: {
        no: {
            type: Number,
            primary: true,
            generated: true, 
        },
        id: {
            type: String,
        },
        password: {
            type: String,
        },
    }
});
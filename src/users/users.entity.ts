import {Entity,Column,PrimaryGeneratedColumn,BeforeInsert} from 'typeorm'
import * as crypto from 'crypto'

@Entity('crud')
export class UserEntity{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : string

    @Column()
    email : string

    @BeforeInsert()
    hashPassword(){
        this.password = crypto.createHmac('sha256', this.password).digest('hex');
    }
    
    @Column()
    password : string
}
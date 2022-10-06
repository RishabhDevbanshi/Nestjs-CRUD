import { Injectable,HttpStatus } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import { UserEntity } from './users.entity';
import { UsersDTO } from './users.dto';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepo : Repository<UserEntity>,
    ){}

    async showAll(){
        return await this.userRepo.find()
    }

    async create(data : UsersDTO){
        const user = this.userRepo.create(data);
        await this.userRepo.save(data);
        return user;
    }

    async findByEmail(email : string) : Promise<UsersDTO>{
        return await this.userRepo.findOne({
            where : {
                email : email,
            },
        })
    }

    async read(id : number){
        return await this.userRepo.findOne({
            where : {id : id}
        })
    }

    async update(id : number , data : Partial<UsersDTO>){
        await this.userRepo.update({id} , data);
        return await this.userRepo.findOne({where : {id : id}})
    }

    async destroy(id : number){
        await this.userRepo.delete({id})
        return {deleted : true}
    }
}

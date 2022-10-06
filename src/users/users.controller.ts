import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { UsersDTO } from './users.dto';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userServices : UsersService){}

    @Get()
    async showAllUsers(){
        const users = await this.userServices.showAll();
        return {
            statusCode : HttpStatus.OK,
            message : 'Users fetched successfully',
            users
        }
    }

    @Post()
    async createUser(@Body() data : UsersDTO){
        const user = await this.userServices.create(data)
        return {
            statusCode : HttpStatus.OK,
            message : 'user created successfully',
            user
        }
    }

    @Get(':id')
    async readUser(@Param('id') id : number){
        const data = await this.userServices.read(id);
        return {
            statusCode : HttpStatus.OK,
            message : 'user fetched successfully',
            data
        }
    }

    @Put(':id')
    async updateUser(@Param('id') id : number , @Body() data : Partial<UsersDTO>){
        await this.userServices.update(id,data)
        return {
            statusCode : HttpStatus.OK,
            message : 'user updates successfully',
        }
    }

    @Delete(':id')
    async deleteUser(@Param(':id') id : number){
        await this.userServices.destroy(id);
        return {
            statusCode : HttpStatus.OK,
            message : 'user deleted successfully'
        }
    }
}

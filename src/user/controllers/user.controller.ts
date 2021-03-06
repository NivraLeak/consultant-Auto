import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { UserService } from './../services/user.service';

@Controller('api/user')
export class UserController {
    
    constructor(
        private userService: UserService
    ){}

    @Get()
    getAll() {
        return this.userService.findAll();
    }

    @Post('/register')
    create(@Body() body: any) {
        return this.userService.register(body);
    }

    @Get('/loggin') 
    loggin(@Body() body: any) {
        return this.userService.findOnetest(body);
    }

    
    @Delete(':id')
    delete(@Param('id') id:number){
        return this.userService.delete(id);
    }
}

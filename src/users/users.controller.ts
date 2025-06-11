import { Controller, Get, Post, Patch, Put, Delete,Param, Query, ParseIntPipe, Body,Headers, Ip, DefaultValuePipe, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user-dto';
import { UsersService } from './providers/users.service';

@Controller('users')
export class UsersController {

    constructor(
        // Injecting the UsersService to use its methods
        private readonly usersService: UsersService,
    ){}

    @Get('/:id/')
    public getUsers(
        @Param() getUsersParamDto: GetUsersParamDto,
        @Query('limit',new DefaultValuePipe(10), ParseIntPipe) limit?: number,
        @Query('page',new DefaultValuePipe(1) ,ParseIntPipe) page?: number,
    ) {
       console.log(getUsersParamDto);

        return `You sent a get request to users endpoint`;
        
    }

    @Post()
    public createUser(
        @Body() createUserDto: CreateUserDto) {
        console.log(typeof createUserDto);
        console.log(createUserDto instanceof CreateUserDto);
        return 'You sent a post request to users endpoint';
    }

    @Patch()
    public patchUser(@Body() patchUSerDto: PatchUserDto) {
        return patchUSerDto;
    }


}

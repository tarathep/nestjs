import { Controller, Get, Post, Patch, Put, Delete,Param, Query, ParseIntPipe, Body,Headers, Ip, DefaultValuePipe, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user-dto';
import { UsersService } from './providers/users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users') // Swagger tag for grouping endpoints
export class UsersController {

    constructor(
        // Injecting the UsersService to use its methods
        private readonly usersService: UsersService,
    ){}

    @Get('/:id/')
    @ApiOperation({
        summary: 'Featches s list of registered users on the application',
    })
    @ApiResponse({
        status: 200,
        description: 'Users featched successfully based on the query',
    })
    @ApiQuery({
        name: 'limit',
        type: 'number',
        required: false,
        description: 'The number of entries returned per query',
        example: 10,
    })
    @ApiQuery({
        name: 'page',
        type: 'number',
        required: false,
        description: 'The position of the page that you want the API to return',
        example: 1,
    })
    public getUsers(
        @Param() getUsersParamDto: GetUsersParamDto,
        @Query('limit',new DefaultValuePipe(10), ParseIntPipe) limit?: number,
        @Query('page',new DefaultValuePipe(1) ,ParseIntPipe) page?: number,
    ) {
       

        return this.usersService.findAll(
            getUsersParamDto,
            limit ?? 10,
            page ?? 1
        );
        
    }

    @Post()
    public createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Patch()
    public patchUser(@Body() patchUSerDto: PatchUserDto) {
        return patchUSerDto;
    }


}

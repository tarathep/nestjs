import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('posts')
@ApiTags('Posts') // Swagger tag for grouping endpoints
export class PostsController {
    constructor(
        private readonly postsService: PostsService, 
    ){}

    /*
    * GET localhost:3000/posts/:userId
    */
   @Get('/:userId')
   public getPosts(@Param('userId') userId: string) {
       return this.postsService.findAll(userId);
   }
}

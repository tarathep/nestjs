import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { PatchPostDto } from './dto/patch-post.dto';

@Controller('posts')
@ApiTags('Posts') // Swagger tag for grouping endpoints
export class PostsController {

    constructor(
        private readonly postsService: PostsService,
    ) { }

    /*
    * GET localhost:3000/posts/:userId
    */
    @Get('/:userId')
    public getPosts(@Param('userId') userId: string) {
        return this.postsService.findAll(userId);
    }

    @ApiOperation({
        summary: "Create a new blog post",
    })
    @ApiResponse({
      status: 201,
      description: 'You get a 201 response if your post is created successfully.',  
    })
    @Post()
    public createPost(@Body() createPostDto: CreatePostDto) {
        console.log(createPostDto);
    }

    @ApiOperation({
        summary: "Updates an exsiting blog post",
    })
    @ApiResponse({
      status: 200,
      description: 'A 200 response if the post is updated successfully.',  
    })
    @Patch()
    public updatePost(@Body() patchPostDto: PatchPostDto) {
        console.log(patchPostDto);
        // Logic for updating a post
        return 'Update post logic goes here';
    }


}

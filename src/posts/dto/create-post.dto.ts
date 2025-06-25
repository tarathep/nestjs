import { IsArray, IsEnum, IsISO8601, IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MinLength, ValidateNested } from "class-validator";
import { PostStatus } from "../enums/postStatus.enum";
import { PostType } from "../enums/postType.enum";
import { CreatePostMetaOptionsDto } from "./create-post.meta-options.dto";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreatePostDto {
    @ApiProperty({
        example: "This is the title",
        description: 'This is the title for the blog post.',
    })
    @IsString()
    @MinLength(4)
    @IsNotEmpty()
    title: string;

    
    @ApiProperty({
        enum: PostType,
        description: "Possible values, 'post', 'page', 'story', 'series'"
    })
    @IsEnum(PostType)
    @IsNotEmpty()
    postType: PostType;

    @ApiProperty({
        description: "'For Example - 'my-url'",
        example: "my-blog-post",
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: 'A slug should be all small letters and use only "-" and without spaces. For example: "my-url"',
    })
    slug: string;


    @ApiProperty({
        enum: PostStatus,
        description: "Ppssible values 'draft'm 'scheduled', 'review', 'published'" 
    })
    @IsEnum(PostStatus)
    @IsNotEmpty()
    status: PostStatus;

    @ApiPropertyOptional({
        description: 'this is the content of the post.',
        example: "The post content"
    })
    @IsString()
    @IsOptional()
    content?: string;

    @ApiPropertyOptional({
        description: 'Serialize your JSON object else a validation error will be thrown',
        example: '{\r\n \"@context\": \"http:\/\/schema.org\",\r\n \"@type\": \"Person\"\r\n }'
    })
    @IsOptional()
    @IsJSON()
    schema?: string;

    @ApiPropertyOptional({
        description: 'Featured image for your blog post.',
        example: 'http://localhost.com/image1.jpg'
    })
    @IsOptional()
    @IsUrl()
    featuredImageUrl?: string;

    @ApiPropertyOptional({
        description: 'The date on which the blog post is published',
        example: '2025-06-22T00:00:00.000'
    })
    @IsOptional()
    @IsISO8601()
    publishOn?: Date;

    @ApiPropertyOptional({
        description: 'Array of tags passed as string values',
        example: ["nestjs", "typescript"]
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true }) // Ensure each tag is a string
    @MinLength(3, { each: true }) // Minimum length for each tag
    tags?: string[];

    @ApiPropertyOptional({
        type: 'array',
        required: false,
        items: {
            type: 'object',
            properties: {
                key: {
                    type: 'string',
                    description: 'The key can be any string for yout meta option',
                    example: 'sidebarEnabled'
                },
                value: {
                    type: 'any',
                    description: 'Any value that you want to save to the key',
                    example: true
                }
            }
        }
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePostMetaOptionsDto)
    metaOptions?: CreatePostMetaOptionsDto[];
}
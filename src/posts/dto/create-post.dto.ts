import { IsArray, IsEnum, IsISO8601, IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MinLength, ValidateNested } from "class-validator";
import { PostStatus } from "../enums/postStatus.enum";
import { PostType } from "../enums/postType.enum";
import { CreatePostMetaOptionsDto } from "./create-post.meta-options.dto";
import { Type } from "class-transformer";

export class CreatePostDto {
    @IsString()
    @MinLength(4)
    @IsNotEmpty()
    title: string;

    
    @IsEnum(PostType)
    @IsNotEmpty()
    postType: PostType;

    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: 'A slug should be all small letters and use only "-" and without spaces. For example: "my-url"',
    })
    slug: string;

    @IsEnum(PostStatus)
    @IsNotEmpty()
    status: PostStatus;

    @IsString()
    @IsOptional()
    content?: string;

    @IsOptional()
    @IsJSON()
    schema?: string;

    @IsOptional()
    @IsUrl()
    featuredImageUrl?: string;

    @IsOptional()
    @IsISO8601()
    publishOn?: Date;

    @IsOptional()
    @IsArray()
    @IsString({ each: true }) // Ensure each tag is a string
    @MinLength(3, { each: true }) // Minimum length for each tag
    tags?: string[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePostMetaOptionsDto)
    metaOption: CreatePostMetaOptionsDto[];
}
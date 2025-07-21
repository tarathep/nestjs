import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PostType } from "../enums/postType.enum";
import { PostStatus } from "../enums/postStatus.enum";
import { CreatePostMetaOptionsDto } from "../dto/create-post.meta-options.dto";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 512,
        nullable: false
    })
    title: string;

    @Column({
        type: 'enum',
        enum: PostType,
        nullable: false,
        default: PostType.POST,
    })
    postType: PostType;

    @Column({
        type:'varchar',
        length: 256,
        nullable: false,
        unique: true,
    })
    slug: string;

    @Column({
        type: 'enum',
        enum: PostStatus,
        nullable: false,
        default: PostStatus.DRAFT,
    })
    status: PostStatus;

    @Column({
        type: 'text',
        nullable: true,
    })
    content?: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    schema?: string;

    @Column({
        type: 'varchar',
        length: 1024,
        nullable: true,
    })
    featuredImageUrl?: string;

    @Column({
        type: 'timestamp',//  if on mysql = 'datetime'
        nullable: true
    })
    publishOn?: Date;

    // work on this in lectures on relationships
    tags?: string[];
    metaOptions?: CreatePostMetaOptionsDto[];
}
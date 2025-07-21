import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { TagsModule } from './tags/tags.module';
import { TagController } from './tag/tag.controller';
import { MetaOptionsModule } from './meta-options/meta-options.module';

@Module({
  imports: [UsersModule, PostsModule, AuthModule, TypeOrmModule.forRootAsync({
    imports: [],
    inject: [],
    useFactory: () => ({
      type: 'postgres',
      entities: [User],
      synchronize: true,
      port: 5432,
      username: 'postgres',
      password: 'password',
      host: '172.16.10.10',
      database: 'nestjs-blog',
    }),
  }), TagsModule, MetaOptionsModule],
  controllers: [AppController, TagController],
  providers: [AppService],
})
export class AppModule {}

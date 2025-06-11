import { Injectable } from '@nestjs/common';
import { title } from 'process';

@Injectable()
export class PostsService {
    public findAll(userId: string) {
       //Users Service
       //Find A user

       return [
            {
                title: 'Test Title',
                content: 'Test Content',
            },
            {
                title: 'Test Title',
                content: 'Test Content 2',
            }
        ];
    }
}

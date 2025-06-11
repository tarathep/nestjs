import { Inject, Injectable,forwardRef, } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,
    ) {}


    public login(email: string, password: string, id: string) {
      // Check user exist database
      const user = this.usersService.findOneById('1234');
      // login
      // token
      return "SAMPLE TOKEN";
    }

    public isAuth () {
        return true;
    }
}

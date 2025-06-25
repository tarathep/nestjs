import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';

/**
 * Class to connect to Users table and perform business operations
 */
@Injectable()
export class UsersService {

    /**
     * Constructor to inject the AuthService.
     * Using forwardRef to avoid circular dependency issues.
     * 
     * @param authService 
     */
    constructor(
        //Inejcting Auth service
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService) {}

    /**
     * The method to get all users from the database.
     * @param getUsersParamDto 
     * @param limit 
     * @param page 
     * @returns 
     */
    public findAll(
        getUsersParamDto: GetUsersParamDto,
        limit: number,
        page: number,
    ) {

        const isAuth = this.authService.isAuth();
        console.log(isAuth);

        return [
            {
                firstName: 'John',
                email: 'john@doe.com'
            },
            {
                firstName: 'Alice',
                email: 'alice@doe.com'
            }
        ]
    }

    /**
     * Find a single user using the ID of the user.
     * @param id 
     * @returns 
     */
    public findOneById(id: string) {
        return {
            id: 1234,
            firstName: 'Alice',
            email: 'alice@doe.com'
        }
    }
}
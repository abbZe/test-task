import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { IUser } from '../interfaces/index.js';
import { UsersService } from '../users.service.js';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private _usersService: UsersService) {
        super();
    }

    public async validate(username: string, password: string): Promise<Omit<IUser, 'password'>> {
        const user = await this._usersService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}

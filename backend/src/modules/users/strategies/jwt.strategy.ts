import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IUser } from '../interfaces/index.js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: IUser) {
        return {
            id: payload.id,
            username: payload.username,
            email: payload.email,
            roles: payload.roles,
            emailConfirmed: payload.emailConfirmed,
            emailConfirmToken: payload.emailConfirmToken,
        };
    }
}

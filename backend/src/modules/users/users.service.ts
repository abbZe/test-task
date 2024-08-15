import {
    ConflictException,
    Inject,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import argon2 from 'argon2';
import { Response } from 'express';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from '../../core/modules/mail/mail.service.js';
import { UserToken } from './constants/index.js';
import { ChangeUserRoleDto } from './dtos/change-user-role.dto.js';
import { RegUserDto } from './dtos/reg-user.dto.js';
import { ResUserDto } from './dtos/res-user.dto.js';
import { IUser } from './interfaces/index.js';

@Injectable()
export class UsersService {
    private readonly _userModel: Model<IUser>;
    private readonly _jwtService: JwtService;
    private readonly _mailService: MailService;
    private readonly _logger: Logger;

    constructor(
        @Inject(UserToken.USER)
        _userModel: Model<IUser>,
        _jwtService: JwtService,
        _mailService: MailService,
    ) {
        this._userModel = _userModel;
        this._jwtService = _jwtService;
        this._mailService = _mailService;
        this._logger = new Logger(UsersService.name);
    }

    public async register(regUserDto: RegUserDto): Promise<ResUserDto> {
        const existingUser = await this._userModel.findOne({ email: regUserDto.email });
        if (existingUser) {
            this._logger.error(`Пользователь с почтой ${regUserDto.email}`);
            throw new ConflictException(`Пользователь с почтой ${regUserDto.email} уже существует`);
        }

        const hashedPassword = await argon2.hash(regUserDto.password);
        const emailConfirmToken = uuidv4();
        await this._mailService.sendMail(
            regUserDto.email,
            '[TEST]: Подтверждение регистрации',
            `Пожалуйста, перейдите по ссылке для подтверждения вашего аккаунта: ${process.env.BACKEND_URL}/users/activate/${emailConfirmToken}`,
        );

        const newUser = new this._userModel({
            ...regUserDto,
            password: hashedPassword,
            emailConfirmToken,
            emailConfirmed: false,
        });

        try {
            return await newUser.save();
        } catch (error: any) {
            this._logger.error(
                `Ошибка при сохранении пользователя ${regUserDto.email}`,
                error.stack,
            );
            throw new InternalServerErrorException(
                'Ошибка при сохранении пользователя',
                error.message,
            );
        }
    }

    public async login(user: any): Promise<{ access_token: string }> {
        const payload = {
            username: user._doc.username,
            email: user._doc.email,
            id: user._doc._id,
            roles: user._doc.roles,
            emailConfirmToken: user._doc.emailConfirmToken,
            emailConfirmed: user._doc.emailConfirmed,
        };

        return {
            access_token: this._jwtService.sign(payload, { secret: process.env.JWT_SECRET }),
        };
    }

    public async validateUser(
        username: string,
        password: string,
    ): Promise<Omit<IUser, 'password'> | undefined> {
        const user = await this._userModel.findOne({ username });

        if (user && (await argon2.verify(user.password, password))) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword as Omit<IUser, 'password'>;
        }

        return undefined;
    }

    public async activate(emailConfirmToken: string, res: Response): Promise<void> {
        try {
            const user = await this._userModel.findOne({ emailConfirmToken }).exec();
            if (!user) {
                throw new NotFoundException('Юзер не найден');
            }

            if (user.emailConfirmed) {
                res.send('<h1>Вы уже активировали Email, повторно активировать не нужно</h1>');
            }

            user.emailConfirmed = true;
            await user.save();
            res.send('<h1>Email успешно активирован!</h1>');
        } catch (error: any) {
            this._logger.error('Ошибка при активации юзера', error.stack);
            throw new InternalServerErrorException('Ошибка при активации юзера');
        }
    }
    public async changeRole(
        userId: string,
        changeUserRoleDto: ChangeUserRoleDto,
    ): Promise<Omit<IUser, 'password'>> {
        const user = await this._userModel.findById(userId);
        if (!user) {
            throw new NotFoundException('Пользователь не найден');
        }

        user.roles = changeUserRoleDto.role;

        this._logger.log(`Роль пользователя ${userId} изменена.`);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = await user.save();
        return userWithoutPassword as Omit<IUser, 'password'>;
    }
}

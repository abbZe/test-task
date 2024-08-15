import { Body, Controller, Get, Param, Post, Put, Request, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserRole } from './constants/index.js';
import { Roles } from './decorators/index.js';
import { ChangeUserRoleDto, RegUserDto, ResUserDto } from './dtos/index.js';
import { JwtAuthGuard, LocalAuthGuard } from './guards/index.js';
import { AuthorizedReq, IUser } from './interfaces/index.js';
import { UsersService } from './users.service.js';

@ApiTags('users')
@Controller('users')
export class UsersController {
    private readonly _userService: UsersService;

    constructor(_userService: UsersService) {
        this._userService = _userService;
    }

    @Post('register')
    @ApiOperation({ summary: 'Регистрация пользователя' })
    @ApiResponse({
        status: 201,
        description: 'Пользователь успешно зарегистрирован',
        type: () => ResUserDto,
    })
    @ApiBody({ type: () => RegUserDto })
    public async register(@Body() regUserDto: RegUserDto): Promise<ResUserDto> {
        return await this._userService.register(regUserDto);
    }

    @Get('activate/:emailConfirmToken')
    @ApiOperation({ summary: 'Активация аккаунта пользователя' })
    @ApiResponse({
        status: 200,
        description: 'Выведется HTML с текстом аккаунт успешно активирован.',
    })
    public async activate(
        @Param('emailConfirmToken') emailConfirmToken: string,
        @Res() res: Response,
    ): Promise<void> {
        return await this._userService.activate(emailConfirmToken, res);
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    @ApiOperation({ summary: 'Вход в систему' })
    @ApiResponse({
        status: 200,
        description: 'Успешный вход в систему',
    })
    public async login(@Request() req: AuthorizedReq): Promise<{ access_token: string }> {
        return await this._userService.login(req.user);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Получение профиля пользователя' })
    @ApiResponse({ status: 200, description: 'Профиль пользователя', type: () => ResUserDto })
    public getProfile(@Request() req: AuthorizedReq): Omit<IUser, 'password'> {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = req.user;
        return userWithoutPassword as Omit<IUser, 'password'>;
    }

    @Put(':userId/role')
    @UseGuards(JwtAuthGuard)
    @Roles(UserRole.USER)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Изменение роли пользователя' })
    @ApiResponse({ status: 200, description: 'Роль пользователя успешно изменена' })
    @ApiBody({ type: () => ChangeUserRoleDto })
    public async changeRole(
        @Body() changeUserRoleDto: ChangeUserRoleDto,
        @Param('id') userId: string,
    ): Promise<Omit<IUser, 'password'>> {
        return await this._userService.changeRole(userId, changeUserRoleDto);
    }
}

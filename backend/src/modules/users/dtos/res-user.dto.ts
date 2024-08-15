import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Document } from 'mongoose';

export class ResUserDto extends Document {
    @ApiProperty({
        example: 'user123',
        description: 'Имя пользователя',
        minLength: 2,
        maxLength: 128,
    })
    username: string;

    @ApiProperty({ example: 'user@example.com', description: 'Электронная почта пользователя' })
    email: string;

    @ApiProperty({ example: 1, description: 'Идентификатор роли пользователя' })
    roles: number;

    @ApiPropertyOptional({
        example: 'someRandomToken',
        description: 'Токен подтверждения электронной почты',
    })
    emailConfirmToken?: string;

    @ApiProperty({ example: true, description: 'Статус подтверждения электронной почты' })
    emailConfirmed: boolean;
}

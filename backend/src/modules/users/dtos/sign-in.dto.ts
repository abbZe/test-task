import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';

export class SignInDto {
    @ApiProperty({
        example: 'user123',
        description: 'Имя пользователя',
        minLength: 2,
        maxLength: 128,
    })
    @IsString()
    @Transform(({ value }) => value.trim())
    @Length(2, 128)
    username: string;

    @ApiProperty({
        example: 'Password123!',
        description: 'Пароль пользователя',
        minLength: 8,
        maxLength: 128,
    })
    @IsString()
    @Transform(({ value }) => value.trim())
    @Length(8, 128)
    password: string;
}

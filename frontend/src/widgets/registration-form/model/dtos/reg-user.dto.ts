import { Transform } from 'class-transformer';
import { IsEmail, IsString, Length } from 'class-validator';

export class RegUserDto {
    @IsString()
    @Transform(({ value }) => value.trim())
    @Length(2, 128)
    username: string;

    @IsString()
    @Transform(({ value }) => value.trim().toLowerCase())
    @IsEmail()
    email: string;

    @IsString()
    @Transform(({ value }) => value.trim())
    @Length(8, 128)
    password: string;
}

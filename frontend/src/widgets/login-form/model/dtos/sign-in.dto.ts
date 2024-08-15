import { Transform } from 'class-transformer';
import { IsEmail, IsString, Length } from 'class-validator';

export class SignInDto {
    @IsString()
    @Transform(({ value }) => value.trim().toLowerCase())
    @IsEmail()
    email: string;

    @IsString()
    @Transform(({ value }) => value.trim())
    @Length(8, 128)
    password: string;
}

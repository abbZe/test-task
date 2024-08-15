import { IsBoolean, IsEmail, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { Document } from 'mongoose';

export interface AuthorizedReq extends Request {
    user: IUser;
}

export class IUser extends Document {
    @IsString()
    @Length(2, 128)
    username: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @Length(8, 128)
    password: string;

    @IsNumber()
    roles: number;

    @IsOptional()
    @IsString()
    emailConfirmToken?: string;

    @IsBoolean()
    emailConfirmed: boolean;
}

import { IsEmail, IsIn, IsOptional, IsString } from 'class-validator';
import { SortBy } from '../interfaces/sort-by.type.js';
import { SortOrder } from '../interfaces/sort-order.type.js';

export class FindAllQueryDto {
    @IsString()
    page: string;

    @IsString()
    pageSize: string;

    @IsOptional()
    @IsIn(['firstName', 'middleName', 'lastName', 'phoneNumber', 'email'])
    sortBy?: SortBy;

    @IsOptional()
    @IsIn(['asc', 'desc'])
    sortOrder?: SortOrder;

    @IsOptional()
    @IsString()
    firstName?: string;

    @IsOptional()
    @IsString()
    middleName?: string;

    @IsOptional()
    @IsString()
    lastName?: string;

    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @IsOptional()
    @IsEmail()
    email?: string;
}

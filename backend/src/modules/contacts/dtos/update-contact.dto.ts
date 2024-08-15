import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateContactDto } from './create-contact.dto.js';

export class UpdateContactDto extends PartialType(CreateContactDto) {
    @ApiProperty({
        description: 'Имя контакта',
        example: 'Дмитрий',
        required: false,
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.trim().toLowerCase())
    firstName?: string;

    @ApiProperty({
        description: 'Отчество контакта',
        example: 'Владимирович',
        required: false,
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.trim().toLowerCase())
    middleName?: string;

    @ApiProperty({
        description: 'Фамилия контакта',
        example: 'Титаренко',
        required: false,
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.trim().toLowerCase())
    lastName?: string;

    @ApiProperty({
        description: 'Список телефонных номеров контакта',
        type: [String],
    })
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @Transform(({ value }) => value.map((v: string) => v.trim().toLowerCase()))
    @IsString({ each: true })
    phoneNumbers?: string[];

    @ApiProperty({
        description: 'Список электронных адресов контакта',
        type: [String],
    })
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @Transform(({ value }) => value.map((v: string) => v.trim().toLowerCase()))
    @IsString({ each: true })
    emails?: string[];
}

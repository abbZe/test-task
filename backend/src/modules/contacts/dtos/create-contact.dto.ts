import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateContactDto {
    @ApiProperty({
        description: 'Имя контакта',
        example: 'Дмитрий',
    })
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.trim().toLowerCase())
    firstName: string;

    @ApiProperty({
        description: 'Отчество контакта, опционально, так как у некоторых людей нет отчества',
        example: 'Владимирович',
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.trim().toLowerCase())
    middleName?: string;

    @ApiProperty({
        description: 'Фамилия контакта',
        example: 'Титаренко',
    })
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.trim().toLowerCase())
    lastName: string;

    @ApiProperty({
        description: 'Список телефонных номеров контакта',
        type: [String],
    })
    @IsArray()
    @ArrayNotEmpty()
    @Transform(({ value }) => value.map((v: string) => v.trim().toLowerCase()))
    @IsString({ each: true })
    phoneNumbers: string[];

    @ApiProperty({
        description: 'Список электронных адресов контакта',
        type: [String],
    })
    @IsArray()
    @ArrayNotEmpty()
    @Transform(({ value }) => value.map((v: string) => v.trim().toLowerCase()))
    @IsString({ each: true })
    emails: string[];
}

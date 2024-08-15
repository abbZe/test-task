import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class ChangeUserRoleDto {
    @ApiProperty({ example: 1, description: 'Битовая маска роли пользователя' })
    @IsNumber()
    @Transform(({ value }) => Number(value))
    role: number;
}

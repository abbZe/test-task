import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class ChangeUserRoleDto {
    @IsNumber()
    @Transform(({ value }) => Number(value))
    role: number;
}

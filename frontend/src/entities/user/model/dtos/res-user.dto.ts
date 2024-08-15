export class ResUserDto {
    username: string;
    email: string;
    roles: number;
    emailConfirmToken?: string;
    emailConfirmed: boolean;
}

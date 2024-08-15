export class CreateContactDto {
    firstName: string;
    middleName?: string;
    lastName: string;
    phoneNumbers: string[];
    emails: string[];
}

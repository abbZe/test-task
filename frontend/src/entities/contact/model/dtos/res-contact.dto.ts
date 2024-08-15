export class ResContactDto {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    phoneNumbers: { id: string; number: string }[];
    emails: { id: string; email: string }[];
}

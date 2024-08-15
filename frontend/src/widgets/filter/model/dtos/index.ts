export type SortBy = 'firstName' | 'middleName' | 'lastName' | 'phoneNumber' | 'email';
export type SortOrder = 'asc' | 'desc';

export class FilterQueryDto {
    page: number;
    pageSize: number;
    sortBy?: SortBy;
    sortOrder?: SortOrder;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    phoneNumber?: string;
    email?: string;
}

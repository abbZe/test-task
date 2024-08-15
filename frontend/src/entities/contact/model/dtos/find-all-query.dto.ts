import type { SortBy } from '../interfaces/sort-by.type.js';
import type { SortOrder } from '../interfaces/sort-order.type.js';

export class FindAllQueryDto {
    page: string;
    pageSize: string;
    sortBy?: SortBy;
    sortOrder?: SortOrder;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    phoneNumber?: string;
    email?: string;
}

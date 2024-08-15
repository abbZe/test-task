import { FindAllQueryDto } from '../dtos/find-all-query.dto.js';

export abstract class ContactsRepository {
    abstract findAll({
        page,
        pageSize,
        sortBy,
        sortOrder,
        firstName,
        middleName,
        lastName,
        phoneNumber,
        email,
    }: FindAllQueryDto): Promise<object[]>;
    abstract findOne(id: string): Promise<object>;
    abstract create(createContactDto: object): Promise<object>;
    abstract update(id: string, updateContactDto: object): Promise<object>;
    abstract remove(id: string): Promise<object>;
}

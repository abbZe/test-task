import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Contact } from '@prisma/client';
import { PrismaService } from '../../../../core/modules/prisma/prisma.service.js';
import { CreateContactDto } from '../../dtos/create-contact.dto.js';
import { FindAllQueryDto } from '../../dtos/find-all-query.dto.js';
import { UpdateContactDto } from '../../dtos/update-contact.dto.js';
import { ContactsRepository } from '../contacts.repository.js';

@Injectable()
export class PrismaContactsRepository implements ContactsRepository {
    private _prisma: PrismaService;

    constructor(_prisma: PrismaService) {
        this._prisma = _prisma;
    }

    async create(createContactDto: CreateContactDto): Promise<Contact> {
        const { phoneNumbers, emails, ...contactData } = createContactDto;

        for (const email of emails) {
            const existingUserWithEmail = await this._prisma.contact.findFirst({
                where: {
                    emails: {
                        some: {
                            email,
                        },
                    },
                },
            });

            if (existingUserWithEmail !== null) {
                throw new HttpException(
                    `Пользователь с электронным адресом '${email}'  уже существует`,
                    HttpStatus.CONFLICT,
                );
            }
        }

        for (const phoneNumber of phoneNumbers) {
            const existingUserWithPhoneNumber = await this._prisma.contact.findFirst({
                where: {
                    phoneNumbers: {
                        some: {
                            number: phoneNumber,
                        },
                    },
                },
            });

            if (existingUserWithPhoneNumber !== null) {
                throw new HttpException(
                    `Пользователь с телефонным номером '${phoneNumber}'  уже существует`,
                    HttpStatus.CONFLICT,
                );
            }
        }
        const createdUser = await this._prisma.contact.create({
            data: {
                ...contactData,
                phoneNumbers: {
                    create: phoneNumbers.map(number => ({ number })),
                },
                emails: {
                    create: emails.map(email => ({ email })),
                },
            },
            include: {
                phoneNumbers: true,
                emails: true,
            },
        });

        return createdUser;
    }

    async findAll({
        page = '1',
        pageSize = '10',
        sortBy,
        sortOrder,
        firstName,
        middleName,
        lastName,
        phoneNumber,
        email,
    }: FindAllQueryDto): Promise<Contact[]> {
        const skip = (+page - 1) * +pageSize;
        const where: any = {};

        if (firstName) where.firstName = { contains: firstName };
        if (middleName) where.middleName = { contains: middleName };
        if (lastName) where.lastName = { contains: lastName };
        if (phoneNumber) where.phoneNumbers = { some: { number: { contains: phoneNumber } } };
        if (email) where.emails = { some: { email: { contains: email } } };

        let orderBy;

        if (sortBy === 'phoneNumber') {
            orderBy = {
                phoneNumbers: {
                    _count: sortOrder || 'asc',
                },
            };
        } else if (sortBy === 'email') {
            orderBy = {
                emails: {
                    _count: sortOrder || 'asc',
                },
            };
        } else {
            orderBy = sortBy ? { [sortBy]: sortOrder || 'asc' } : {};
        }

        const contacts = await this._prisma.contact.findMany({
            skip,
            take: +pageSize,
            where,
            orderBy,
            include: {
                phoneNumbers: true,
                emails: true,
            },
        });

        if (contacts.length === 0) {
            throw new HttpException('Контакты не найдены', HttpStatus.NOT_FOUND);
        }

        return contacts;
    }

    async findOne(id: string): Promise<Contact> {
        const contact = await this._prisma.contact.findUnique({
            where: { id },
            include: {
                phoneNumbers: true,
                emails: true,
            },
        });

        if (contact === null) {
            throw new HttpException(`Контакт с id '${id}' не найден`, HttpStatus.NOT_FOUND);
        }

        return contact;
    }

    async update(id: string, updateContactDto: UpdateContactDto): Promise<Contact> {
        const { phoneNumbers, emails, ...contactData } = updateContactDto;

        try {
            const updatedContact = await this._prisma.contact.update({
                where: { id },
                data: {
                    ...contactData,
                    phoneNumbers: phoneNumbers
                        ? {
                              deleteMany: {},
                              create: phoneNumbers.map(number => ({ number })),
                          }
                        : undefined,
                    emails: emails
                        ? {
                              deleteMany: {},
                              create: emails.map(email => ({ email })),
                          }
                        : undefined,
                },
                include: {
                    phoneNumbers: true,
                    emails: true,
                },
            });

            return updatedContact;
        } catch {
            throw new HttpException(
                `Ошибка при обновлении контакта с id '${id}'`,
                HttpStatus.BAD_GATEWAY,
            );
        }
    }

    async remove(id: string): Promise<Contact> {
        try {
            await this._prisma.phoneNumber.deleteMany({
                where: { contactId: id },
            });

            await this._prisma.email.deleteMany({
                where: { contactId: id },
            });

            const deletedContact = await this._prisma.contact.delete({
                where: { id },
            });

            return deletedContact;
        } catch {
            throw new HttpException(
                `Ошибка при удалении контакта с id '${id}'`,
                HttpStatus.BAD_GATEWAY,
            );
        }
    }
}

import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateContactDto } from './dtos/create-contact.dto.js';
import { FindAllQueryDto } from './dtos/find-all-query.dto.js';
import { UpdateContactDto } from './dtos/update-contact.dto.js';
import { ContactsRepository } from './repository/contacts.repository.js';

@ApiTags('contacts')
@Controller('contacts')
export class ContactsController {
    constructor(private readonly contactsRepository: ContactsRepository) {}

    @Post()
    @ApiOperation({ summary: 'Создать новый контакт' })
    @ApiBody({ type: CreateContactDto })
    @ApiResponse({
        status: 201,
        description: 'Контакт успешно создан',
        type: CreateContactDto,
    })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    create(@Body() createContactDto: CreateContactDto) {
        return this.contactsRepository.create(createContactDto);
    }

    @Get()
    @ApiOperation({ summary: 'Получить все контакты' })
    @ApiResponse({ status: 200, description: 'Получить все контакты', type: [CreateContactDto] })
    findAll(@Query() query: FindAllQueryDto) {
        return this.contactsRepository.findAll(query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить контакт по ID' })
    @ApiParam({ name: 'id', description: 'ID контакта' })
    @ApiResponse({ status: 200, description: 'Контакт получен', type: CreateContactDto })
    @ApiResponse({ status: 404, description: 'Контакт не найден' })
    findOne(@Param('id') id: string) {
        return this.contactsRepository.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Частично oбновить контакт по ID' })
    @ApiParam({ name: 'id', description: 'ID контакта' })
    @ApiBody({ type: UpdateContactDto })
    @ApiResponse({
        status: 200,
        description: 'Контакт успешно обновлен',
        type: UpdateContactDto,
    })
    @ApiResponse({ status: 404, description: 'Контакт не найден' })
    update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
        return this.contactsRepository.update(id, updateContactDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить контакт по ID' })
    @ApiParam({ name: 'id', description: 'ID контакта' })
    @ApiResponse({ status: 200, description: 'Контакт успешно удален' })
    @ApiResponse({ status: 404, description: 'Контакт не найден' })
    remove(@Param('id') id: string) {
        return this.contactsRepository.remove(id);
    }
}

import { Module } from '@nestjs/common';
import { PrismaModule } from '../../core/modules/prisma/prisma.module.js';
import { ContactsController } from './contacts.controller.js';
import { ContactsRepository } from './repository/contacts.repository.js';
import { PrismaContactsRepository } from './repository/prisma/prisma-contacts.repository.js';

@Module({
    imports: [PrismaModule],
    controllers: [ContactsController],
    providers: [
        {
            provide: ContactsRepository,
            useClass: PrismaContactsRepository,
        },
        PrismaModule,
    ],
})
export class ContactsModule {}

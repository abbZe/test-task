import { Module } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { DBConnection } from '../../shared/constants';

@Module({
    providers: [
        {
            provide: DBConnection.MONGO,
            useFactory: (): Promise<typeof mongoose> => mongoose.connect(process.env.MONGO_DB_URI!),
        },
    ],
    exports: [
        {
            provide: DBConnection.MONGO,
            useFactory: (): Promise<typeof mongoose> => mongoose.connect(process.env.MONGO_DB_URI!),
        },
    ],
})
export class MongoModule {}

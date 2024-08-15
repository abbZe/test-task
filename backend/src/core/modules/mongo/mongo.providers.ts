import * as mongoose from 'mongoose';
import { DBConnection } from '../../shared/constants/index.js';

export const mongoProviders = [
    {
        provide: DBConnection.MONGO,
        useFactory: (): Promise<typeof mongoose> => mongoose.connect(process.env.MONGO_DB_URI!),
    },
];

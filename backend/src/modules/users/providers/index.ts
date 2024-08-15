import { Connection } from 'mongoose';
import { DBConnection } from '../../../core/shared/constants/index.js';
import { UserToken } from '../constants/index.js';
import { UserModel } from '../models/index.js';

export const usersProviders = [
    {
        provide: UserToken.USER,
        useFactory: (connection: Connection) => connection.model('User', UserModel),
        inject: [DBConnection.MONGO],
    },
];

import mongoose from 'mongoose';
import { UserRole } from '../constants/index.js';

export const UserModel = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Пароль должен быть как минимум 8 символов'],
    },
    roles: { type: Number, required: true, default: UserRole.ADMIN },
    emailConfirmToken: { type: String, required: false },
    emailConfirmed: { type: Boolean, required: true, default: false },
});

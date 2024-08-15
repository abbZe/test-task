import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY, UserRole } from '../constants/index.js';

export const Roles = (role: UserRole) => SetMetadata(ROLES_KEY, role);

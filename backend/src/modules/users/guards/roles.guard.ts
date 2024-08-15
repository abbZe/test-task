import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../constants/index.js';

@Injectable()
export class RolesGuard implements CanActivate {
    private readonly _reflector: Reflector;

    constructor(_reflector: Reflector) {
        this._reflector = _reflector;
    }

    canActivate(context: ExecutionContext): boolean {
        const requiredRole = this._reflector.getAllAndOverride(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRole) {
            return true;
        }
        const req = context.switchToHttp().getRequest();
        return (requiredRole & req.user.roles) === requiredRole;
    }
}

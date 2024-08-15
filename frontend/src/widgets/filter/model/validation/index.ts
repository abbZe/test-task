import { number, object, string } from 'yup';
import { FilterQueryDto } from '../dtos';

export const validationSchema = object().shape({
    sortBy: string()
        .oneOf(['firstName', 'middleName', 'lastName', 'phoneNumber', 'email'])
        .optional(),
    sortOrder: string().oneOf(['asc', 'desc']).optional(),
    firstName: string().optional(),
    middleName: string().optional(),
    lastName: string().optional(),
    phoneNumber: string().optional(),
    email: string().email().optional(),
    pageSize: number().integer().positive().required(),
    page: number().integer().positive().required(),
});

export const initialValues: FilterQueryDto = {
    sortBy: 'firstName',
    sortOrder: 'desc',
    firstName: undefined,
    middleName: undefined,
    lastName: undefined,
    phoneNumber: undefined,
    email: undefined,
    pageSize: 10,
    page: 1,
};

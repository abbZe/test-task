import { apiInstance } from '../../../shared/api';
import { CreateContactDto } from '../model';

interface ICreateContactRes {
    error: undefined | string;
    data: undefined | CreateContactDto;
}
interface ICreateContactData {
    firstName: string;
    middleName: string;
    lastName: string;
    phoneNumbers: string[];
    emails: string[];
}

export const handleSubmit = async (data: ICreateContactData): Promise<ICreateContactRes> => {
    try {
        const res = await apiInstance.post('/contacts', data);

        if (res.status === 201) {
            return { error: undefined, data: res.data };
        } else {
            console.warn('Неожиданный статус ответа:', res.status);
            return { error: 'Неопознанная ошибка', data: undefined };
        }
    } catch (error: any) {
        if (error.response && error.response.status === 409) {
            return {
                error: 'Пользователь с таким электронным адресом или телефоном уже существует',
                data: undefined,
            };
        } else if (error.response && error.response.status === 400) {
            console.log(error.response.data.message);
            const message =
                error.response.data.message[0] ?? 'Проверьте корректность введенных данных';
            console.error('Ошибка выполнения запроса:', message);
            return { error: message, data: undefined };
        }

        const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
        console.error('Ошибка выполнения запроса:', message);
        return { error: message, data: undefined };
    }
};

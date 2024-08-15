import { apiInstance } from '../../../shared/api';
import { UpdateContactDto } from '../model';

interface IUpdateContactRes {
    error: undefined | string;
    data: undefined | UpdateContactDto;
}
interface IUpdateContactData {
    firstName: string;
    middleName: string;
    lastName: string;
    phoneNumbers: string[];
    emails: string[];
}

export const handleSubmit = async (
    contactId: string,
    data: IUpdateContactData,
): Promise<IUpdateContactRes> => {
    try {
        const res = await apiInstance.patch(`/contacts/${contactId}`, data);

        if (res.status === 200) {
            return { error: undefined, data: res.data };
        } else {
            console.warn('Неожиданный статус ответа:', res.status);
            return { error: 'Неопознанная ошибка', data: undefined };
        }
    } catch (error: any) {
        if (error.response && error.response.status === 409) {
            return {
                error: 'Пользователь с таким электронным адресом уже существует',
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

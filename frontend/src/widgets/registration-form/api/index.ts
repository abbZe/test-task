import { ResUserDto } from '../../../entities/user';
import { apiInstance } from '../../../shared/api';

interface IRegRes {
    error: undefined | string;
    data: undefined | ResUserDto;
}
interface IRegData {
    username: string;
    password: string;
    email: string;
}

export const handleSubmit = async (data: IRegData): Promise<IRegRes> => {
    try {
        const res = await apiInstance.post('/user/register', data);

        if (res.status === 201) {
            return { error: undefined, data: res.data };
        } else {
            console.warn('Неожиданный статус ответа:', res.status);
            return { error: 'Неопознанная ошибка', data: undefined };
        }
    } catch (error: any) {
        if (error.response && error.response.status === 409) {
            return {
                error: `Пользователь с адресом ${data.email} уже существует`,
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

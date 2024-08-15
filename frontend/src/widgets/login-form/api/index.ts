import { apiInstance } from '../../../shared/api';

interface ILoginRes {
    error: undefined | string;
    data: undefined | { access_token: string };
}
interface ILoginData {
    password: string;
    email: string;
}

export const handleSubmit = async (data: ILoginData): Promise<ILoginRes> => {
    try {
        const res = await apiInstance.post('/user/login', data);

        if (res.status === 200) {
            return { error: undefined, data: res.data };
        } else {
            console.warn('Неожиданный статус ответа:', res.status);
            return { error: 'Неопознанная ошибка', data: undefined };
        }
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            return {
                error: 'Email или Password введены неверно',
                data: undefined,
            };
        }
        const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
        console.error('Ошибка выполнения запроса:', message);
        return { error: message, data: undefined };
    }
};

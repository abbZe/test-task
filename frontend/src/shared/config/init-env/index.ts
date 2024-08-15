/**
 * Модуль инициализации env-переменных
 * @remark Если не найдено значение хоть одной переменной,
 * Приложение сразу выбросит ошибку, при инициализации модуля
 * @module
 */

/**
 * Получение env-переменной
 * @throwable
 */
export const getEnvVar = (key: string) => {
    if (process.env[key] === undefined) {
        throw new Error(`Env variable ${key} is required`);
    }

    return process.env[key] || '';
};

export const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL;
export const NODE_ENV = process.env.NODE_ENV;
export const isDevEnv = NODE_ENV === 'development';
export const isProdEnv = NODE_ENV === 'production';

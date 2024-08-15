import { array, object, string } from 'yup';

export const validationSchema = object().shape({
    firstName: string()
        .trim()
        .min(2, 'Имя пользователя должно содержать минимум 2 символа')
        .max(128, 'Имя пользователя не может превышать 128 символов')
        .required('Имя пользователя обязательно'),
    middleName: string()
        .trim()
        .min(2, 'Отчество пользователя должно содержать минимум 2 символа')
        .max(128, 'Отчество пользователя не может превышать 128 символов'),
    lastName: string()
        .trim()
        .min(2, 'Фамилия пользователя должна содержать минимум 2 символа')
        .max(128, 'Фамилия пользователя не может превышать 128 символов'),
    phoneNumbers: array()
        .of(
            string()
                .required('Номер телефона обязателен')
                .trim()
                .matches(
                    /^\+?[1-9]\d{1,20}$/,
                    'Номер телефона должен быть в международном формате',
                ),
        )
        .min(1, 'Должен быть указан хотя бы один номер телефона')
        .required('Номера телефонов обязательны'),
    emails: array()
        .of(
            string()
                .required('Электронный адрес обязателен')
                .trim()
                .email('Некорректный формат email'),
        )
        .min(1, 'Должен быть указан хотя бы один email')
        .required('Email адреса обязательны'),
});

export const initialValues = {
    firstName: '',
    middleName: '',
    lastName: '',
    phoneNumbers: [''],
    emails: [''],
};

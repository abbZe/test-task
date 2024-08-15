'use client';

import DOMPurify from 'dompurify';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { handleSubmit, initialValues, validationSchema } from '..';
import s from './styles.module.scss';

export const RegistrationForm: React.FC = () => {
    const [isRegistered, setIsRegistered] = useState<boolean>(false);
    const { push } = useRouter();

    if (isRegistered) {
        setTimeout(() => push('/user/login'), 1000);
        return <div className={s.successMessage}>Регистрация успешно завершена!</div>;
    }

    return (
        <div className={s.container}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={({ username, password, email }, { setSubmitting, setErrors }) => {
                    const sanitizedValues = {
                        username: DOMPurify.sanitize(username),
                        email: DOMPurify.sanitize(email),
                        password: DOMPurify.sanitize(password),
                    };
                    handleSubmit(sanitizedValues).then(({ error, data }) => {
                        if (error) {
                            console.error(error);
                            setErrors({ email: error });
                        } else if (data !== undefined) {
                            setIsRegistered(true);
                            setSubmitting(false);
                        }
                    });
                }}
            >
                <Form className={s.form}>
                    <ErrorMessage name="username" component="div" className={s.error} />
                    <Field
                        className={s.username}
                        name="username"
                        placeholder="username"
                        type="text"
                    />
                    <ErrorMessage name="email" component="div" className={s.error} />
                    <Field className={s.email} name="email" placeholder="email" type="email" />
                    <ErrorMessage name="password" component="div" className={s.error} />
                    <Field
                        className={s.password}
                        name="password"
                        placeholder="password"
                        type="password"
                    />
                    <button className={s.submitButton} type="submit">
                        Register
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

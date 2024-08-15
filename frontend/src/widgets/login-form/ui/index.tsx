'use client';

import DOMPurify from 'dompurify';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { handleSubmit, initialValues, useIsLoggedIn, validationSchema } from '..';
import s from './styles.module.scss';

export const LoginForm: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useIsLoggedIn();

    if (isLoggedIn) {
        return <div className={s.successMessage}>Успешный вход!</div>;
    }

    return (
        <div className={s.container}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={({ email, password }, { setSubmitting, setErrors }) => {
                    const sanitizedValues = {
                        email: DOMPurify.sanitize(email),
                        password: DOMPurify.sanitize(password),
                    };
                    handleSubmit(sanitizedValues).then(({ error, data }) => {
                        if (error) {
                            console.error(error);
                            setErrors({ email: error });
                        } else if (data !== undefined) {
                            localStorage.setItem('jwtToken', data.access_token);
                            setIsLoggedIn(true);
                        }
                        setSubmitting(false);
                    });
                }}
            >
                <Form className={s.form}>
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
                        Login
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

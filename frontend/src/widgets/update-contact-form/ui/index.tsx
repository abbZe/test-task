'use client';

import DOMPurify from 'dompurify';
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { handleSubmit, initialValues, validationSchema } from '..';
import s from './styles.module.scss';
import { useParams } from 'next/navigation';

export const UpdateContactForm: React.FC = () => {
    const [isUpdated, setIsUpdated] = useState<boolean>(false);
    const { push } = useRouter();
    const { uid: contactId } = useParams();

    if (isUpdated) {
        setTimeout(() => push('/contacts'), 1000);
        return <div className={s.successMessage}>Контакт успешно обновлен!</div>;
    }

    return (
        <div className={s.container}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(
                    { firstName, middleName, lastName, phoneNumbers, emails },
                    { setSubmitting, setErrors },
                ) => {
                    const sanitizedValues = {
                        firstName: DOMPurify.sanitize(firstName),
                        middleName: DOMPurify.sanitize(middleName),
                        lastName: DOMPurify.sanitize(lastName),
                        phoneNumbers: phoneNumbers.map((number: string) =>
                            DOMPurify.sanitize(number),
                        ),
                        emails: emails.map((email: string) => DOMPurify.sanitize(email)),
                    };
                    handleSubmit(contactId as string, sanitizedValues).then(({ error, data }) => {
                        if (error) {
                            console.error(error);
                            setErrors({ firstName: error });
                        } else if (data !== undefined) {
                            setIsUpdated(true);
                            setSubmitting(false);
                        }
                    });
                }}
            >
                <Form className={s.form}>
                    <ErrorMessage name="firstName" component="div" className={s.error} />
                    <Field
                        className={s.firstName}
                        name="firstName"
                        placeholder="First Name"
                        type="text"
                    />
                    <ErrorMessage name="middleName" component="div" className={s.error} />
                    <Field
                        className={s.middleName}
                        name="middleName"
                        placeholder="Middle Name"
                        type="text"
                    />
                    <ErrorMessage name="lastName" component="div" className={s.error} />
                    <Field
                        className={s.lastName}
                        name="lastName"
                        placeholder="Last Name"
                        type="text"
                    />
                    <FieldArray name="phoneNumbers">
                        {({ push, remove, form }) => (
                            <div>
                                {form.values.phoneNumbers.map((_: string, index: number) => (
                                    <div key={index}>
                                        <Field
                                            name={`phoneNumbers[${index}]`}
                                            placeholder="Phone Number"
                                            type="text"
                                            className={s.phoneNumber}
                                        />
                                        <button type="button" onClick={() => remove(index)}>
                                            Удалить телефонный номер
                                        </button>
                                    </div>
                                ))}
                                <ErrorMessage
                                    name="phoneNumbers"
                                    component="div"
                                    className={s.error}
                                />
                                <button type="button" onClick={() => push('')}>
                                    Добавить телефонный номер
                                </button>
                            </div>
                        )}
                    </FieldArray>
                    <FieldArray name="emails">
                        {({ push, remove, form }) => (
                            <div>
                                {form.values.emails.map((_: string, index: number) => (
                                    <div key={index}>
                                        <Field
                                            name={`emails[${index}]`}
                                            placeholder="Email"
                                            type="email"
                                            className={s.email}
                                        />
                                        <button type="button" onClick={() => remove(index)}>
                                            Удалить электронную почту
                                        </button>
                                    </div>
                                ))}
                                <ErrorMessage name="emails" component="div" className={s.error} />
                                <button type="button" onClick={() => push('')}>
                                    Добавить электронную почту
                                </button>
                            </div>
                        )}
                    </FieldArray>
                    <button className={s.submitButton} type="submit">
                        Обновить данные
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

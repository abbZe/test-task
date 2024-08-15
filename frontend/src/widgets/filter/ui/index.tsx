'use client';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useHandleSubmit } from '../lib';
import { initialValues, validationSchema } from '../model';
import s from './styles.module.scss';

export const Filter: React.FC = () => {
    const handleSubmit = useHandleSubmit();

    return (
        <section className={s.filter} id={s.filter}>
            <div className={s.container}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className={s.form}>
                        <div className={s.formGroup}>
                            <label htmlFor="sortBy">Сортировать по</label>
                            <Field as="select" name="sortBy" id="sortBy">
                                <option value="firstName">Имя</option>
                                <option value="middleName">Отчество</option>
                                <option value="lastName">Фамилия</option>
                                <option value="phoneNumber">Телефонный номер</option>
                                <option value="email">Электронная почта</option>
                            </Field>
                            <ErrorMessage name="sortBy" component="div" className={s.error} />
                        </div>

                        <div className={s.formGroup}>
                            <label htmlFor="sortOrder">Порядок сортировки</label>
                            <Field as="select" name="sortOrder" id="sortOrder">
                                <option value="asc">Возрастающий</option>
                                <option value="desc">Убывающий</option>
                            </Field>
                            <ErrorMessage name="sortOrder" component="div" className={s.error} />
                        </div>

                        <div className={s.formGroup}>
                            <label htmlFor="firstName">Имя</label>
                            <Field type="text" name="firstName" id="firstName" />
                            <ErrorMessage name="firstName" component="div" className={s.error} />
                        </div>

                        <div className={s.formGroup}>
                            <label htmlFor="middleName">Отчество</label>
                            <Field type="text" name="middleName" id="middleName" />
                            <ErrorMessage name="middleName" component="div" className={s.error} />
                        </div>

                        <div className={s.formGroup}>
                            <label htmlFor="lastName">Фамилия</label>
                            <Field type="text" name="lastName" id="lastName" />
                            <ErrorMessage name="lastName" component="div" className={s.error} />
                        </div>

                        <div className={s.formGroup}>
                            <label htmlFor="phoneNumber">Телефонный номер</label>
                            <Field type="text" name="phoneNumber" id="phoneNumber" />
                            <ErrorMessage name="phoneNumber" component="div" className={s.error} />
                        </div>

                        <div className={s.formGroup}>
                            <label htmlFor="email">Электронный адрес</label>
                            <Field type="email" name="email" id="email" />
                            <ErrorMessage name="email" component="div" className={s.error} />
                        </div>
                        <button className={s.submitButton} type="submit">
                            Сортировать
                        </button>
                    </Form>
                </Formik>
            </div>
        </section>
    );
};

'use client';

import { useParams } from 'next/navigation';
import { API_URL } from '../../../shared/config';
import useSWR from 'swr';
import { ResContactDto } from '../../../entities/contact';
import { fetcher } from '../../../shared/lib';
import Loading from '../../../../app/contacts/[uid]/loading';
import { ErrorMessage } from '../../../shared/ui/error-message';
import Link from 'next/link';

export const ContactItem = () => {
    const { uid } = useParams();

    const url = `${API_URL}/contacts/${uid}?page=1&pageSize=10`;

    const { data: contact, isLoading, error } = useSWR<ResContactDto>(url, fetcher);
    console.log('CONTACTS', contact);

    if (isLoading) return <Loading />;
    if (error) return <ErrorMessage message={error.message} />;
    if (contact === undefined) return <>Контакт не найден</>;
    return (
        <>
            <div key={contact.id}>
                <h1>{`${contact.firstName} ${contact.middleName} ${contact.lastName}`}</h1>

                <ul>
                    {contact.phoneNumbers.map(phoneNumber => (
                        <li>{phoneNumber.number}</li>
                    ))}
                </ul>

                <ul>
                    {contact.emails.map(email => (
                        <li>{email.email}</li>
                    ))}
                </ul>
            </div>

            <Link href={`/contacts/${uid}/update`}>Редактировать контакт</Link>
        </>
    );
};

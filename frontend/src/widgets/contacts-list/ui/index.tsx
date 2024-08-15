import Link from 'next/link';
import { ResContactDto } from '../../../entities/contact';
import s from './styles.module.scss';

export const ContactsList: React.FC<{ contacts: ResContactDto[] }> = ({ contacts }) => (
    <>
        {contacts.map((contact: ResContactDto) => (
            <div key={contact.id} className={s.card}>
                <Link className={s.link} href={`/contacts/${contact.id}`}>
                    <p className={s.title}>{contact.firstName}</p>
                    <p className={s.title}>{contact.middleName}</p>
                    <p className={s.title}>{contact.lastName}</p>
                    <ul className={s.list}>
                        {contact.phoneNumbers.map(({ id, number }) => (
                            <li className={s.item} key={id}>
                                {number}
                            </li>
                        ))}
                    </ul>
                    <ul className={s.list}>
                        {contact.emails.map(({ id, email }) => (
                            <li className={s.item} key={id}>
                                {email}
                            </li>
                        ))}
                    </ul>
                </Link>
            </div>
        ))}
    </>
);

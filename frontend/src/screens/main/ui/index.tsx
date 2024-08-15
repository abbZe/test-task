import Link from 'next/link';
import s from './styles.module.scss';

export const MainPage: React.FC = () => {
    return (
        <section className={s.linksSection}>
            <div className={s.linksWrapper}>
                <Link className={s.link} href={'/contacts/create'}>
                    Создать контакт
                </Link>
                <Link className={s.link} href={'/contacts'}>
                    Список контактов
                </Link>
            </div>
        </section>
    );
};

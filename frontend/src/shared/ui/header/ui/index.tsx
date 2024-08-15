import Link from 'next/link';
import s from './styles.module.scss';

export const Header: React.FC = () => {
    return (
        <header className={s.header}>
            <Link className={s.startPageLink} href={'/'}>
                На главную
            </Link>
        </header>
    );
};

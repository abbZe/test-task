'use client';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import useSWRInfinite from 'swr/infinite';
import { ResContactDto } from '../../../entities/contact';
import { fetcher } from '../../../shared/lib/fetcher';
import { ErrorMessage } from '../../../shared/ui/error-message/ui';
import { ContactsList } from '../../contacts-list';
import { useGetURL } from '../lib/hooks';
import { RenderSkeleton } from './render-skeleton/ui';
import s from './styles.module.scss';

export const ContactsInfinityScroll = () => {
    /**
     * Hooks
     */
    const [pageSize] = useState<string>('10');

    const getURL = useGetURL(pageSize);

    const { ref, inView } = useInView({
        threshold: 0,
    });

    const { data, size, setSize, error, isLoading } = useSWRInfinite<ResContactDto[]>(
        getURL,
        fetcher,
        {
            revalidateFirstPage: false,
        },
    );

    /**
     * Constants
     */
    const contacts = data ? data.flat() : [];
    const isLoadingMore = isLoading || (size > 0 && data && data[size - 1] === undefined);
    const isEmpty = data?.[0]?.length === 0;
    // @ts-expect-error: data always not undefined
    const isReachingEnd = isEmpty || (data && data?.at(-1)?.length < Number(pageSize));
    const skeleton = isLoading || isLoadingMore ? RenderSkeleton(pageSize) : undefined;

    /**
     * Lifecycle
     */
    useEffect(() => {
        if (inView && !isReachingEnd) setSize(size + 1);
    }, [inView]);

    /**
     * TSX
     */
    if (error !== undefined) {
        return <ErrorMessage message={error.message} />;
    }
    return (
        <section className={s.contactsInfScroll} id={s.contactsInfScroll}>
            <div className={s.container}>
                {isEmpty ? (
                    <p className={s.notFoundMessage}>Пусто, контакты еще не созданы.</p>
                ) : undefined}

                <div className={s.contactsList}>
                    {isLoading ? skeleton : <ContactsList contacts={contacts} />}
                    {isLoadingMore ? skeleton : undefined}
                </div>

                <div ref={ref} />
            </div>
        </section>
    );
};

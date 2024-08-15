import Skeleton from 'react-loading-skeleton';
import s from './styles.module.scss';

export const RenderSkeleton = (pageSize: string) => {
    return Array.from({ length: Number(pageSize) })
        .fill('skeleton')
        .map((_, index) => (
            <div key={index} className={s.eoCard}>
                <Skeleton className={s.eoCardSkeleton} />
            </div>
        ));
};

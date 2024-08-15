import { useSearchParams } from 'next/navigation';
import { API_URL } from '../../../shared/config';

export const useGetURL = (pageSize: string) => {
    const searchParams = useSearchParams();

    const getURL = (page: number, previousPageData: any | null) => {
        const isReachedEnd = previousPageData && previousPageData.length === 0;
        // eslint-disable-next-line unicorn/no-null
        if (isReachedEnd) return null;

        const url = new URL(`${API_URL}/contacts`);
        for (const [key, value] of searchParams) {
            url.searchParams.append(key, value);
        }
        url.searchParams.set('page', (++page).toString());
        url.searchParams.set('pageSize', pageSize);

        return url.toString();
    };

    return getURL;
};

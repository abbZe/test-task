'use client';

import { useRouter } from 'next/navigation';
import { FilterQueryDto } from '../model';

export const useHandleSubmit = () => {
    const router = useRouter();

    const handleSubmit = (currentValues: FilterQueryDto) => {
        const params = new URLSearchParams();

        // Add each value from rest to the URLSearchParams
        for (const [key, value] of Object.entries(currentValues)) {
            if (value !== undefined && value !== '') {
                if (Array.isArray(value)) {
                    for (const item of value) {
                        params.append(key, item);
                    }
                } else {
                    params.append(key, String(value));
                }
            }
        }

        router.push(`/contacts?${params.toString()}`);
    };

    return handleSubmit;
};

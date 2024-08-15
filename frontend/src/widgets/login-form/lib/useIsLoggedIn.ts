'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useIsLoggedIn = (): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const { push } = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            setTimeout(() => push('/user/me'), 1000);
        }
    }, [isLoggedIn]);

    return [isLoggedIn, setIsLoggedIn];
};

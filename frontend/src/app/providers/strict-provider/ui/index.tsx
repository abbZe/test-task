import React, { ReactNode } from 'react';

interface StrictProviderProps {
    children: ReactNode;
}
export const StrictProvider = (props: StrictProviderProps) => {
    return <React.StrictMode>{props.children}</React.StrictMode>;
};

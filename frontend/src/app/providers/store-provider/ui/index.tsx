'use client';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '..';

interface StoreProviderProps {
    children: ReactNode;
}

export const StoreProvider = (props: StoreProviderProps) => {
    return <Provider store={store}>{props.children}</Provider>;
};

export const withStore =
    (component: ({ children }: { children: React.ReactNode }) => React.ReactNode) =>
    // eslint-disable-next-line react/display-name
    ({ children }: { children: React.ReactNode }) => (
        <Provider store={store}>{component({ children })}</Provider>
    );

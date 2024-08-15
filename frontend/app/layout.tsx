import { config as fontAwesomeCfg } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { StoreProvider, StrictProvider } from '../src/app/providers';
import '../src/app/styles/index.scss';
import { Header } from '../src/shared/ui/header';
fontAwesomeCfg.autoAddCss = false;

export const metadata: Metadata = {
    title: 'Test-task',
    description: 'test task site for demonstration',
};

interface IProps {
    children: ReactNode;
}

const RootLayout = ({ children }: IProps): JSX.Element => {
    return (
        <StrictProvider>
            <StoreProvider>
                <html lang="en">
                    <body>
                        <Header />
                        {children}
                    </body>
                </html>
            </StoreProvider>
        </StrictProvider>
    );
};

export default RootLayout;

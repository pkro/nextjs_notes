import '@/styles/globals.css';
import type {AppProps} from 'next/app';
import {Raleway} from '@next/font/google';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const raleway = Raleway({subsets: ['latin']});

const queryClient = new QueryClient();
export default function App({Component, pageProps}: AppProps) {
    return (
        <main className={raleway.className}>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
        </main>);
}

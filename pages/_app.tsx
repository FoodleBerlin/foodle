import '../styles/app.scss';
import type { AppProps } from 'next/app';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  console.log('SERVER_URL:' + process.env.SERVER_URL + 'api/auth');

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;

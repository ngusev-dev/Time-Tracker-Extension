import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { RouterProvider } from 'react-router/dom';
import { router } from './router.tsx';

import './index.css';

import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from './lib/apollo/apollo.client.ts';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <Toaster position="top-center" reverseOrder={false} gutter={8} containerClassName="" containerStyle={{}} />
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>
);

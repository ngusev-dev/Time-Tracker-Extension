import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { RouterProvider } from 'react-router/dom';
import { router } from './router.tsx';

import './lib/index.css';

import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from './lib/apollo/apollo.client.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>
);

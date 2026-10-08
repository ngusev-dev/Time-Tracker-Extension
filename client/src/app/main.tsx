import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { RouterProvider } from 'react-router/dom';
import { router } from '@/app/router';

import '@/app/styles/index.css';

import { ApolloProvider } from '@apollo/client/react';
import { apolloClient, setUnauthorizedHandler } from '@/shared/api/apollo.client';
import { Toaster } from 'react-hot-toast';
import { isPublicPath, PUBLIC_ROUTES } from '@/shared/config/routes';
import { resetSession } from '@/shared/lib/session';

let isHandlingUnauthorized = false;

setUnauthorizedHandler(async () => {
  if (isHandlingUnauthorized || isPublicPath(router.state.location.pathname)) return;
  isHandlingUnauthorized = true;

  try {
    await router.navigate(PUBLIC_ROUTES.goTo(PUBLIC_ROUTES.AUTH), { replace: true });
    await resetSession();
  } finally {
    isHandlingUnauthorized = false;
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <Toaster position="top-center" reverseOrder={false} gutter={8} containerClassName="" containerStyle={{}} />
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>,
);

import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

type UnauthorizedHandler = () => void;

let unauthorizedHandler: UnauthorizedHandler | null = null;

export const setUnauthorizedHandler = (handler: UnauthorizedHandler) => {
  unauthorizedHandler = handler;
};

export const isUnauthorizedError = (error: { extensions?: Record<string, unknown> }) => {
  const extensions = error.extensions as { code?: string; originalError?: { statusCode?: number } } | undefined;

  return extensions?.originalError?.statusCode === 401 || extensions?.code === 'UNAUTHENTICATED';
};

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors?.some(isUnauthorizedError)) unauthorizedHandler?.();
});

const httpLink = new HttpLink({ uri: `${import.meta.env.VITE_API_URL}/graphql`, credentials: 'include' });

const link = ApolloLink.from([errorLink, httpLink]);

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

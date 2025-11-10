import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';

const httpLink = new HttpLink({ uri: 'http://localhost:3000/graphql', credentials: 'same-origin' });

const link = ApolloLink.from([httpLink]);

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

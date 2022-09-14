import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Home from './pages/Home'
import SavedBooks from './pages/SavedBooks';
import SavedMovies from './pages/SavedMovies'
import Navbar from './components/Navbar';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App () {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/saved/books' component={SavedBooks} />
              <Route exact path={'/saved/movies'} component={SavedMovies}/>
              <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
            </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

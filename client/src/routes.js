import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './components/App/App';
import history from './history';

const query = "";

export const makeMainRoutes = () => {
  return (
      <Router history={history}>
        <div>
          <Route path="/" render={(props) => <App {...props} />} />}
        </div>
      </Router>
  );
}
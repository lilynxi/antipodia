// @flow

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'App';
import AntipodePage from 'App/screens/AntipodePage';

const createRoutes = (
  // store: Store<any, any>,
): React.Element<any> => (
  <Route component={App} path="/">
    <IndexRoute component={AntipodePage} />
  </Route>
);

export default createRoutes;

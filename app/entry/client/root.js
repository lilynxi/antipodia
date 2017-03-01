// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import type { Store } from 'redux';

type RootProps = {
  store: Store<any, any>,
  routes: React.Element<any>,
  history: any,
};

const Root = ({
  store,
  routes,
  history,
}: RootProps): React.Element<any> => (
  <AppContainer>
    <Provider store={store}>
      <Router history={history}>
        {routes}
      </Router>
    </Provider>
  </AppContainer>
);

export default Root;

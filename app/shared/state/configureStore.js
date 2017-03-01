// @flow

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import type { Store } from 'redux';
import createReducer from './reducers';

const configureStore = (
  history: any,
  initialState?: any = {},
): Store<any, any> => {
  const middlewares: Array<Function> = [
    routerMiddleware(history),
  ];

  const enhancers: Array<Function> = [
    applyMiddleware(...middlewares),
  ];

  if (__DEVELOPMENT__) { // eslint-disable-line no-constant-condition
    const devToolsExtension = __CLIENT__ && global.devToolsExtension ||
      (() => (noop: any): any => noop);

    enhancers.push(devToolsExtension());
  }

  // Create the store with the enhancers.
  const store: Store<any, any> = createStore(
    createReducer(),
    initialState,
    compose(...enhancers),
  );

  // Make reducers hot reloadable.
  if (module.hot && module.hot.accept && typeof module.hot.accept === 'function') {
    module.hot.accept('./reducers', (): void => {
      const nextRootReducer: Object = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;

// @flow

import configureStore from 'state/configureStore';
import type { Store } from 'redux';

export default (
  history: Object = {},
): Store<any, any> => {
  // eslint-disable-next-line no-underscore-dangle
  const initialState = global.__INITIAL_STATE__ || {};

  return configureStore(
    history,
    initialState,
  );
};

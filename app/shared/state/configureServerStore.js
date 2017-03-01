// @flow

import configureStore from 'state/configureStore';
import type { Store } from 'redux';

export default (
  history: Object = {},
  // req: Object = {},
): Store<any, any> =>
  configureStore(
    history,
  );

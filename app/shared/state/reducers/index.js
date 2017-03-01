/**
 * Combine all reducers in this file and export the combined reducers. If we
 * were to do this in store.js, reducers wouldn't be hot reloadable.
 *
 * @flow
 */

import { combineReducers } from 'redux';
import routeReducer from './route';

/**
 * Creates the main reducer.
 */
export default (): Function => combineReducers({
  route: routeReducer,
});

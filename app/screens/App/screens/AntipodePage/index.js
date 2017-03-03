/* eslint-disable */

import React from 'react';
import Helmet from 'react-helmet';
import App from './app';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../../../../shared/state/reducers/reducers';
import rootSaga from 'state/sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

// then run the saga
sagaMiddleware.run(rootSaga);

const AntipodePage = (): React.Element<any> => (
  <div>
    <Helmet title="Hello world!" />
    <Provider store={store}>
      <App
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCo9HjDmEGGRE3nOk-fWwP2YmpfF-JcWqM&libraries=places"
        loadingElement={<div>Loading</div>}
      />
    </Provider>
  </div>
);

export default AntipodePage;

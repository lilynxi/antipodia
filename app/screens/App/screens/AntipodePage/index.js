/* eslint-disable */

import React from 'react';
import Helmet from 'react-helmet';
import App from './app';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import defaultExport from '../../../../shared/state/reducers/reducers';


const store = createStore(
  defaultExport,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);



const AntipodePage = (): React.Element<any> => (
  <div>
    <Helmet title="Hello world!" />
    <Provider store={store}>
      <App />
    </Provider>
  </div>
);

export default AntipodePage;

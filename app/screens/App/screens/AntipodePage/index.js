// @flow

import React from 'react';
import Helmet from 'react-helmet';
import App from './app';

const AntipodePage = (): React.Element<any> => (
  <div>
    <Helmet title="Hello world!" />
    <App />
  </div>
);

export default AntipodePage;

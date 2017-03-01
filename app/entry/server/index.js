// @flow

import path from 'path';
import express from 'express';
import compression from 'compression';
import { renderFile } from 'ejs';

// Express middleware for server side rendering.
const rendererMiddleware = (
  req: Object,
  res: Object,
  next: Function,
): void => {
  // Do not use this middleware for anything that looks like a static file.
  if (req.url.match(/\./)) {
    next();
  } else {
    require('./render').default(req, res, next); // eslint-disable-line global-require
  }
};

const createServer = (paths: { [key: string]: string }) => {
  const port = process.env.PORT || 3000;

  const app = express();
  app.use(compression());

  app.set('views', paths.appBuild);
  app.set('view engine', 'ejs');
  app.engine('ejs', renderFile);

  app.use(express.static(path.join(paths.appBuild, 'public'), {
    // Cache static files for a year.
    maxAge: 31536000000,
  }));

  // Use the server side rendering middleware..
  app.use(rendererMiddleware);

  // Start the app.
  // eslint-disable-next-line no-console
  app.listen(port, () => console.log(`Server started on port ${port}.`));
};

export default createServer;

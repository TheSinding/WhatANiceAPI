/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);
process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

if (
  process.env.GOOGLE_APPLICATION_CREDENTIALS === null ||
  process.env.GOOGLE_APPLICATION_CREDENTIALS === undefined
) {
  throw new Error('GOOGLE_APPLICATION_CREDENTIALS is missing!');
}

server.on('listening', () =>
  logger.info(
    'Feathers application started on http://%s:%d',
    app.get('host'),
    port
  )
);

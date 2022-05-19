import { createLogger, transports } from 'winston';

const logLevels = {
  error: 0,

  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

const logger = createLogger({
  levels: logLevels,
  transports: [new transports.Console()],
});

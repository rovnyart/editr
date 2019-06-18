import { createLogger, format, transports } from 'winston';

import config from '../config/environment';

export default createLogger({
  level: config.logLevel || 'debug',
  transports: [
    new transports.Console({ format: format.combine(format.colorize(), format.align(), format.simple()) }),
  ],
});

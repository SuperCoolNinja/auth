import { ELogLevel } from '../enums/ELogger';

function log(level: ELogLevel, message: string | object): void {
  let logMessage: string;

  if (typeof message === 'object') {
    logMessage = JSON.stringify(message, null, 2);
  } else {
    logMessage = `${message}`;
  }

  switch (level) {
    case ELogLevel.DEBUG:
      logMessage = `\u001b[34m[DEBUG]\u001b[0m]${logMessage}`; // Blue
      break;
    case ELogLevel.INFO:
      logMessage = `\u001b[32m[INFO]\u001b[0m]${logMessage}`; // Green
      break;
    case ELogLevel.WARNING:
      logMessage = `\u001b[33m[WARNING]\u001b[0m]${logMessage}`; // Yellow
      break;
    case ELogLevel.ERROR:
      logMessage = `\u001b[31m[ERROR]\u001b[0m]${logMessage}`; // Red
      break;
    default:
      break;
  }

  console.log(logMessage);
}

export const logger = {
  debug(message: string | object): void {
    log(ELogLevel.DEBUG, message);
  },
  info(message: string | object): void {
    log(ELogLevel.INFO, message);
  },
  warning(message: string | object): void {
    log(ELogLevel.WARNING, message);
  },
  error(message: string | object): void {
    log(ELogLevel.ERROR, message);
  },
};
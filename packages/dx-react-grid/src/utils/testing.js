import { format } from 'util';

export const setupConsole = (config = {}) => {
  const savedConsoleError = console.error; // eslint-disable-line no-console
  console.error = (error) => { // eslint-disable-line no-console
    if (!config.ignore || !config.ignore.filter(message => error.includes(message)).length) {
      throw new Error(error);
    }
  };
  return () => {
    console.error = savedConsoleError; // eslint-disable-line no-console
  };
};

export const setupWarningInterceptor = () => {
  /* eslint-disable no-console */
  const savedConsoleWarn = console.warn;
  const savedConsoleError = console.error;

  const logToError = (...args) => {
    throw new Error(format(...args).replace(/^Error: (?:Warning: )?/, ''));
  };

  console.warn = logToError;
  console.error = logToError;

  return () => {
    console.warn = savedConsoleWarn;
    console.error = savedConsoleError;
  };
  /* eslint-enable no-console */
};

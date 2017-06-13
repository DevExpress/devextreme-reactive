import { format } from 'util';

export const setupConsole = (config = {}) => {
  /* eslint-disable no-console */
  const savedConsoleWarn = console.warn;
  const savedConsoleError = console.error;

  const logToError = (...args) => {
    if (!config.ignore || !config.ignore.filter(message => args[0].includes(message)).length) {
      throw new Error(format(...args).replace(/^Error: (?:Warning: )?/, ''));
    }
  };

  console.warn = logToError;
  console.error = logToError;

  return () => {
    console.warn = savedConsoleWarn;
    console.error = savedConsoleError;
  };
  /* eslint-enable no-console */
};

import { format } from 'util';

const defaultIgnore = [
  'react-error-boundaries',
  'componentWillUpdate has been renamed, and is not recommended for use.',
  'componentWillReceiveProps has been renamed, and is not recommended for use.',
];

export const setupConsole = (config = {}) => {
  /* eslint-disable no-console */
  const savedConsoleWarn = console.warn;
  const savedConsoleError = console.error;
  const ignore = [...defaultIgnore, ...(config.ignore || [])];

  const logToError = (...args) => {
    const errorMessage = args[0];

    if (!ignore.some(message => errorMessage.includes(message))) {
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

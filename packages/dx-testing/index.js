const { format } = require('util');

module.exports = {
  setupConsole: (config = {}) => {
    /* eslint-disable no-console */
    const savedConsoleWarn = console.warn;
    const savedConsoleError = console.error;

    const logToError = (...args) => {
      const errorMessage = args[0];

      if (!errorMessage.includes('react-error-boundaries')
        && !(config.ignore
        && config.ignore.filter(message => errorMessage.includes(message)).length)) {
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
  },
};

export const setupConsole = (config = {}) => {
  /* eslint-disable no-console */
  const savedConsoleWarn = console.warn;
  const savedConsoleError = console.error;

  const logToError = (...args) => {
    const formatOutput = config.formatOutput;
    const errorMessage = args[0];

    if (!config.ignore || !config.ignore.filter(message => errorMessage.includes(message)).length) {
      throw new Error(
        formatOutput
        ? formatOutput(...args).replace(/^Error: (?:Warning: )?/, '')
        : errorMessage,
      );
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

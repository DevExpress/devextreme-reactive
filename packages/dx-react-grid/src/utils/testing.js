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

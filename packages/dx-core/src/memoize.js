import { argumentsShallowEqual } from './shallow-equal';

export const memoize = (func) => {
  let lastArgs = null;
  let lastResult = null;
  return (...args) => {
    if (lastArgs === null || !argumentsShallowEqual(lastArgs, args)) {
      lastResult = func(...args);
    }
    lastArgs = args;
    return lastResult;
  };
};

import { argumentsShallowEqual } from './shallow-equal';
import { Memoized } from '@devexpress/dx-core';

/** @internal */
export const memoize = (func) => {
  let lastArgs: any = null;
  let lastResult: ReturnType<typeof func> = null;
  return (...args) => {
    if (lastArgs === null || !argumentsShallowEqual(lastArgs, args)) {
      lastResult = func(...args);
    }
    lastArgs = args;
    return lastResult;
  };
};

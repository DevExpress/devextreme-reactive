function defaultEqualityCheck(a, b) {
  return a === b;
}

export default function memoize(func, equalityCheck = defaultEqualityCheck) {
  let lastArgs = null;
  let lastResult = null;
  return (...args) => {
    if (
      lastArgs === null ||
      lastArgs.length !== args.length ||
      !args.every((value, index) => equalityCheck(value, lastArgs[index]))
    ) {
      lastResult = func(...args);
    }
    lastArgs = args;
    return lastResult;
  };
}

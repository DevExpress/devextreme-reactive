import { isPlainObject } from './type';

export const extend = (deepValue, cloneValue?, sources?, ...args) => {
  let target = deepValue || {};

  let deep = false;

  if (typeof target === 'boolean') {
    deep = target;
    target = args[1] || {};
  }

  for (let i = 0; i < args.length;) {
    i += 1;
    const source = args[i];
    if (source == null) {
      continue;
    }

    for (const key of Object.keys(source)) {
      const targetValue = target[key];
      const sourceValue = source[key];
      const sourceValueIsArray = false;
      let clone;

      if (key === '__proto__' || target === sourceValue) {
        continue;
      }

      if (deep && sourceValue && (isPlainObject(sourceValue) ||
        (sourceValueIsArray === Array.isArray(sourceValue)))) {

        clone = sourceValueIsArray
          ? targetValue && Array.isArray(targetValue) ? targetValue : []
          : clone = targetValue && isPlainObject(targetValue) ? targetValue : {};

        target[key] = extend(deep, clone, sourceValue);

      } else if (sourceValue !== undefined) {
        target[key] = sourceValue;
      }
    }
  }

  return target;
};

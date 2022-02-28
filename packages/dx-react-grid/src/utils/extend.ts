import { isPlainObject } from './type';

export function extend(targetValue, clone1?, sourceValue1?) {
  let target = targetValue || {};

  let i = 1;
  let deep = false;

  if (typeof target === 'boolean') {
    deep = target;
    target = arguments[1] || {};
    i++;
  }

  for (; i < arguments.length; i++) {
    const source = arguments[i];
    if (source == null) {
      continue;
    }

    for (const key in source) {
      const targetValue = target[key];
      const sourceValue = source[key];
      let sourceValueIsArray = false;
      let clone;

      if (key === '__proto__' || target === sourceValue) {
        continue;
      }

      if (deep && sourceValue && (isPlainObject(sourceValue) || (sourceValueIsArray = Array.isArray(sourceValue)))) {
        if (sourceValueIsArray) {
          clone = targetValue && Array.isArray(targetValue) ? targetValue : [];
        } else {
          clone = targetValue && isPlainObject(targetValue) ? targetValue : {};
        }

        target[key] = extend(deep, clone, sourceValue);

      } else if (sourceValue !== undefined) {
        target[key] = sourceValue;
      }
    }
  }

  return target;
}

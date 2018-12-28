/** @internal */
export const shallowEqual = (objA, objB) => {
  if (objA === objB) {
    return true;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  const hasOwn = Object.prototype.hasOwnProperty;
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < keysA.length; i += 1) {
    if (!hasOwn.call(objB, keysA[i])
        || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }

    const valA = objA[keysA[i]];
    const valB = objB[keysA[i]];

    if (valA !== valB) {
      return false;
    }
  }

  return true;
};

/** @internal */
export const argumentsShallowEqual = (prev, next) => {
  if (prev === null || next === null || prev.length !== next.length) {
    return false;
  }

  for (let i = 0; i < prev.length; i += 1) {
    if (prev[i] !== next[i]) {
      return false;
    }
  }

  return true;
};

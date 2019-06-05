import { PureComputed } from '@devexpress/dx-core';

type CompareFn = (...args: [any, any]) => boolean;
/** @internal */
export const arraysEqual: PureComputed<[any[], any[], CompareFn?], boolean> = (
  arrA, arrB, comparator = (a, b) => a === b,
) => {
  if (arrA.length !== arrB.length) {
    return false;
  }
  for (let i = 0; i < arrA.length; i += 1) {
    if (!comparator(arrA[i], arrB[i])) {
      return false;
    }
  }
  return true;
};

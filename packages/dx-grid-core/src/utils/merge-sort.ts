import { slice } from '@devexpress/dx-core';
import { MergeFn, SortArrayToAuxiliaryFn, CompareFn } from '../types';

/* eslint-disable no-plusplus, no-param-reassign, no-use-before-define, no-constant-condition */
/* tslint:disable no-increment-decrement */

const merge: MergeFn = (array, auxiliary, lo, mid, hi, compare) => {
  let i = lo;
  let j = mid + 1;
  let k = lo;
  while (true) {
    const cmp = compare(array[i], array[j]);
    if (cmp <= 0) {
      auxiliary[k++] = array[i++];
      if (i > mid) {
        do {
          auxiliary[k++] = array[j++];
        } while (j <= hi);
        break;
      }
    } else {
      auxiliary[k++] = array[j++];
      if (j > hi) {
        do {
          auxiliary[k++] = array[i++];
        } while (i <= mid);
        break;
      }
    }
  }
};

const sortArrayToAuxiliary: SortArrayToAuxiliaryFn = (array, auxiliary, lo, hi, compare) => {
  if (hi < lo) return;
  if (hi === lo) {
    auxiliary[lo] = array[lo];
    return;
  }
  const mid = Math.floor(lo + ((hi - lo) / 2));
  sortAuxiliaryToArray(array, auxiliary, lo, mid, compare);
  sortAuxiliaryToArray(array, auxiliary, mid + 1, hi, compare);
  merge(array, auxiliary, lo, mid, hi, compare);
};

const sortAuxiliaryToArray: SortArrayToAuxiliaryFn = (array, auxiliary, lo, hi, compare) => {
  if (hi <= lo) return;
  const mid = Math.floor(lo + ((hi - lo) / 2));
  sortArrayToAuxiliary(array, auxiliary, lo, mid, compare);
  sortArrayToAuxiliary(array, auxiliary, mid + 1, hi, compare);
  merge(auxiliary, array, lo, mid, hi, compare);
};

export default (
  array: any[] | ReadonlyArray<any>,
  compare: CompareFn = (a, b): number => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  },
) => {
  const result = slice(array);
  const auxiliary = slice(array);
  sortAuxiliaryToArray(result, auxiliary, 0, result.length - 1, compare);
  return result;
};

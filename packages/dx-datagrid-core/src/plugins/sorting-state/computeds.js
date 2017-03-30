function mergeSort(array, comparefn) {
  /* eslint-disable */
  function merge(arr, aux, lo, mid, hi, comparefn) {
    let i = lo;
    let j = mid + 1;
    let k = lo;
    while (true) {
      const cmp = comparefn(arr[i], arr[j]);
      if (cmp <= 0) {
        aux[k++] = arr[i++];
        if (i > mid) {
          do { aux[k++] = arr[j++]; }
          while (j <= hi);
          break;
        }
      } else {
        aux[k++] = arr[j++];
        if (j > hi) {
          do { aux[k++] = arr[i++]; }
          while (i <= mid);
          break;
        }
      }
    }
  }

  function sortarrtoaux(arr, aux, lo, hi, comparefn) {
    if (hi < lo) return;
    if (hi == lo) {
      aux[lo] = arr[lo];
      return;
    }
    const mid = Math.floor(lo + (hi - lo) / 2);
    sortarrtoarr(arr, aux, lo, mid, comparefn);
    sortarrtoarr(arr, aux, mid + 1, hi, comparefn);
    merge(arr, aux, lo, mid, hi, comparefn);
  }

  function sortarrtoarr(arr, aux, lo, hi, comparefn) {
    if (hi <= lo) return;
    const mid = Math.floor(lo + (hi - lo) / 2);
    sortarrtoaux(arr, aux, lo, mid, comparefn);
    sortarrtoaux(arr, aux, mid + 1, hi, comparefn);
    merge(aux, arr, lo, mid, hi, comparefn);
  }

  function merge_sort(arr, comparefn) {
    const aux = arr.slice(0);
    sortarrtoarr(arr, aux, 0, arr.length - 1, comparefn);
    return arr;
  }

  return merge_sort(array, comparefn);
};

const createSortingCompare = (sorting, compareEqual) => (a, b) => {
  let sortColumn = sorting.column,
    inverse = sorting.direction === 'desc';

  if (a[sortColumn] === b[sortColumn]) {
    return compareEqual && compareEqual(a, b) || 0;
  }

  return (a[sortColumn] < b[sortColumn]) ^ inverse ? -1 : 1;
};

export const sortedRows = (rows, sortings) => {
  if (!sortings.length) { return rows; }

  const compare = sortings.slice()
        .reverse()
        .reduce((prevCompare, sorting) => createSortingCompare(sorting, prevCompare), () => 0);

  return mergeSort(rows.slice(), compare);
};

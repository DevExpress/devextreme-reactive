const DELAY = 200;

const compare = (a, b) => {
  const aPosition = a.position();
  const bPosition = b.position();
  for (let i = 0; i < Math.min(aPosition.length, bPosition.length); i += 1) {
    if (aPosition[i] < bPosition[i]) return -1;
    if (aPosition[i] > bPosition[i]) return 1;
  }
  return aPosition.length - bPosition.length;
};

/** @internal */
export const insertPlugin = (array, newItem) => {
  const result = array.slice();
  const nextItemIndex = array.findIndex(item => compare(newItem, item) <= 0);
  const targetIndex = nextItemIndex < 0 ? array.length : nextItemIndex;
  const alreadyExists = (targetIndex >= 0 && targetIndex < array.length)
    && compare(newItem, array[targetIndex]) === 0;
  result.splice(targetIndex, alreadyExists ? 1 : 0, newItem);
  return result;
};

/** @internal */
export const removePlugin = (array, item) => {
  const itemIndex = array.indexOf(item);
  return itemIndex >= 0 ? [...array.slice(0, itemIndex), ...array.slice(itemIndex + 1)] : array;
};

/** @internal */
export const createClickHandlers = (click?, dblClick?) => {
  let timeoutId;
  const events: any = {};
  if (click) {
    events.onClick = (e) => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          clearTimeout(timeoutId);
          click(e);
        }, DELAY);
      }
    };
  }
  if (dblClick) {
    events.onDoubleClick = (e) => {
      clearTimeout(timeoutId);
      dblClick(e);
    };
  }
  return events;
};

/** @internal */
export const slice = arr => Array.prototype.slice.call(arr); // slice can be renamed to copy as well

/** @internal */
export const hasWindow = () => typeof window !== 'undefined';

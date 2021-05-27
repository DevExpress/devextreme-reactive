import { DIFFERENCE } from '../../constants';

/** @internal */
export const isReadyToRenderSeries = (
  { pane, ...restLayouts }, { current },
  isPreviousDataEmpty: boolean, axesExist: boolean,
) => {
  if (!pane.width && !pane.height) {
    return false;
  }
  const bbox = current.getBoundingClientRect();
  let width = pane.width;
  let height = pane.height;
  Object.entries(restLayouts).forEach((el) => {
    const orientation = el[0].split('-')[0];
    if (orientation === 'top' || orientation === 'bottom') {
      height += el[1].height;
    } else {
      width += el[1].width;
    }
  });
  return Math.abs(bbox.width - width) < DIFFERENCE &&
    Math.abs(bbox.height - height) < DIFFERENCE
    && isPreviousDataEmptyOrNoAxes(isPreviousDataEmpty, axesExist);
};

const isPreviousDataEmptyOrNoAxes = (
  isPreviousDataEmpty: boolean, axesExist: boolean,
) => !isPreviousDataEmpty || !axesExist;

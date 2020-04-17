import { DIFFERENCE } from '../../constants';

/** @internal */
export const getReadiness = (
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
    if (el[0].includes('top') || el[0].includes('bottom')) {
      height += el[1].height;
    } else {
      width += el[1].width;
    }
  });
  return Math.abs(bbox.width - width) < DIFFERENCE &&
    Math.abs(bbox.height - height) < DIFFERENCE
    && checkPreviousDataAndAxes(isPreviousDataEmpty, axesExist);
};

const checkPreviousDataAndAxes = (
  isPreviousDataEmpty: boolean, axesExist: boolean,
) => (!isPreviousDataEmpty && axesExist) || !axesExist;

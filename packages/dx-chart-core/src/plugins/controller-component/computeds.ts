const difference = 0.9;

/** @internal */
export const getReadiness = ({ pane, ...restLayouts }, { current }) => {
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
  return Math.abs(bbox.width - width) < difference &&
  Math.abs(bbox.height - height) < difference;
};

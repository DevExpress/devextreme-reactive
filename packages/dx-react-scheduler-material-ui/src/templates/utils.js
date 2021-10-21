import { darken, alpha, lighten } from '@mui/material/styles';
import { PRIMARY_COLOR } from './constants';

export const getBorder = theme => (`1px solid ${
  theme.palette.mode === 'light'
    ? lighten(alpha(theme.palette.divider, 1), 0.88)
    : darken(alpha(theme.palette.divider, 1), 0.68)
}`);

export const getBrightBorder = theme => (`1px solid ${
  theme.palette.mode === 'light'
    ? lighten(alpha(theme.palette.divider, 1), 0.72)
    : darken(alpha(theme.palette.divider, 1), 0.5)
}`);

export const cellsMeta = (tableElement) => {
  const cellElements = Array.from(tableElement.querySelectorAll('td'));
  return {
    parentRect: () => tableElement.getBoundingClientRect(),
    getCellRects: cellElements.map(element => () => element.getBoundingClientRect()),
  };
};

export const scrollingStrategy = (scrollablePart, fixedPartVertical, fixedPartHorizontal) => {
  const fixedPartVerticalRect = fixedPartVertical.getBoundingClientRect();
  const fixedPartHorizontalRect = fixedPartHorizontal
    && fixedPartHorizontal.getBoundingClientRect();

  const changeVerticalScroll = (value) => {
    // eslint-disable-next-line no-param-reassign
    scrollablePart.scrollTop += value;
  };
  const changeHorizontalScroll = (value) => {
    // eslint-disable-next-line no-param-reassign
    scrollablePart.scrollLeft += value;
  };

  return ({
    topBoundary: fixedPartVerticalRect.height + fixedPartVerticalRect.top,
    bottomBoundary: scrollablePart.offsetTop + scrollablePart.clientHeight,
    fixedTopHeight: fixedPartVerticalRect.height,
    leftBoundary: fixedPartHorizontalRect
      ? fixedPartHorizontalRect.width + fixedPartHorizontalRect.left
      : scrollablePart.offsetLeft,
    rightBoundary: scrollablePart.offsetLeft + scrollablePart.clientWidth,
    fixedLeftWidth: fixedPartHorizontalRect?.width,
    changeVerticalScroll,
    changeHorizontalScroll,
  });
};

export const ensureColor = (level, color) => (color[level] || PRIMARY_COLOR[level]);

export const getResourceColor = (resources) => {
  if (resources && resources.length) {
    return resources.find(resource => resource.isMain)?.color;
  } return undefined;
};

export const getAppointmentColor = (level, color, defaultColor) => {
  if (!color) return ensureColor(level, defaultColor);
  if (typeof color === 'string') return color;
  return ensureColor(level, color);
};

export const getWidthInPixels = (cellsNumber, cellWidth) => `${cellsNumber * cellWidth}px`;

export const getViewCellKey = (startDate, groups) => {
  if (!groups) return startDate.toString();
  return groups.reduce((acc, group) => acc.concat(group.id), startDate.toString());
};

export const addCommaAndSpaceToString = string => string && `${string},\xa0`;

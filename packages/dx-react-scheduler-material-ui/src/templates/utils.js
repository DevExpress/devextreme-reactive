import { darken, fade, lighten } from '@material-ui/core/styles/colorManipulator';
import { PRIMARY_COLOR } from './constants';

export const getBorder = theme => (`1px solid ${
  theme.palette.type === 'light'
    ? lighten(fade(theme.palette.divider, 1), 0.88)
    : darken(fade(theme.palette.divider, 1), 0.68)
}`);

export const getBrightBorder = theme => (`1px solid ${
  theme.palette.type === 'light'
    ? lighten(fade(theme.palette.divider, 1), 0.72)
    : darken(fade(theme.palette.divider, 1), 0.5)
}`);

export const cellsMeta = (tableElement) => {
  const cellElements = Array.from(tableElement.querySelectorAll('td'));
  return {
    parentRect: () => tableElement.getBoundingClientRect(),
    getCellRects: cellElements.map(element => () => element.getBoundingClientRect()),
  };
};

export const scrollingStrategy = (scrollablePart, fixedPart) => {
  const fixedPartRect = fixedPart.getBoundingClientRect();
  const changeVerticalScroll = (value) => {
    // eslint-disable-next-line no-param-reassign
    scrollablePart.scrollTop += value;
  };
  const changeHorizontalScroll = (value) => {
    // eslint-disable-next-line no-param-reassign
    scrollablePart.scrollLeft += value;
  };

  return ({
    topBoundary: fixedPartRect.height + fixedPartRect.top,
    bottomBoundary: scrollablePart.offsetTop + scrollablePart.clientHeight,
    leftBoundary: scrollablePart.offsetLeft,
    rightBoundary: scrollablePart.offsetLeft + scrollablePart.clientWidth,
    changeVerticalScroll,
    changeHorizontalScroll,
  });
};

export const ensureColor = (level, color) => (color[level] || PRIMARY_COLOR[level]);

export const getResourceColor = (resources) => {
  if (resources && resources.length) {
    return resources.find(resource => resource.isMain).color;
  } return undefined;
};

export const getAppointmentColor = (level, color, defaultColor) => {
  if (!color) return ensureColor(level, defaultColor);
  if (typeof color === 'string') return color;
  return ensureColor(level, color);
};

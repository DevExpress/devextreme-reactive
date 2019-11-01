import { darken, fade, lighten } from '@material-ui/core/styles/colorManipulator';
import { PRIMARY_COLOR } from './constants';

export const getBorder = theme => (`1px solid ${
  theme.palette.type === 'light'
    ? lighten(fade(theme.palette.divider, 1), 0.88)
    : darken(fade(theme.palette.divider, 1), 0.68)
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

  return ({
    topBoundary: fixedPartRect.height + fixedPartRect.top,
    bottomBoundary: scrollablePart.offsetTop + scrollablePart.clientHeight,
    changeVerticalScroll,
  });
};

export const setColor = (level, color) => (color[level] || PRIMARY_COLOR[level]);

export const getResourceColor = (resources) => {
  if (resources && resources.length) {
    debugger
    return resources.find(resource => resource.isMain).color; // string | { [100], [200], [300], ... }
  }
  return undefined;
};

export const getAppointmentColor = (level, color, defaultColor) => {
  if (!color) return setColor(level, defaultColor);
  if (typeof color === 'string') return color;
  return setColor(level, color);
};

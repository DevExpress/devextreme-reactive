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

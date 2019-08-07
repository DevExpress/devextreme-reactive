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

export const getNumberLabels = getMessage => [
  {
    text: getMessage('firstLabel'),
    id: 0,
  },
  {
    text: getMessage('secondLabel'),
    id: 1,
  },
  {
    text: getMessage('thirdLabel'),
    id: 2,
  },
  {
    text: getMessage('fourthLabel'),
    id: 3,
  },
  {
    text: getMessage('lastLabel'),
    id: 4,
  },
];

export const getDaysOfWeek = getMessage => [
  {
    text: getMessage('sundayLabel'),
    id: 0,
  },
  {
    text: getMessage('mondayLabel'),
    id: 1,
  },
  {
    text: getMessage('tuesdayLabel'),
    id: 2,
  },
  {
    text: getMessage('wednesdayLabel'),
    id: 3,
  },
  {
    text: getMessage('thursdayLabel'),
    id: 4,
  },
  {
    text: getMessage('fridayLabel'),
    id: 5,
  },
  {
    text: getMessage('saturdayLabel'),
    id: 6,
  },
];

export const getMonths = getMessage => [
  {
    text: getMessage('januaryLabel'),
    id: 1,
  },
  {
    text: getMessage('februaryLabel'),
    id: 2,
  },
  {
    text: getMessage('marchLabel'),
    id: 3,
  },
  {
    text: getMessage('aprilLabel'),
    id: 4,
  },
  {
    text: getMessage('mayLabel'),
    id: 5,
  },
  {
    text: getMessage('juneLabel'),
    id: 6,
  },
  {
    text: getMessage('julyLabel'),
    id: 7,
  },
  {
    text: getMessage('augustLabel'),
    id: 8,
  },
  {
    text: getMessage('septemberLabel'),
    id: 9,
  },
  {
    text: getMessage('octoberLabel'),
    id: 10,
  },
  {
    text: getMessage('novemberLabel'),
    id: 11,
  },
  {
    text: getMessage('decemberLabel'),
    id: 12,
  },
];

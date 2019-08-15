import { LONG_WEEK_DAY_OPTIONS } from '@devexpress/dx-scheduler-core';

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

export const getDaysOfWeek = formatDate => [
  {
    text: formatDate(new Date(2019, 7, 11, 0, 0), LONG_WEEK_DAY_OPTIONS),
    id: 0,
  },
  {
    text: formatDate(new Date(2019, 7, 12, 0, 0), LONG_WEEK_DAY_OPTIONS),
    id: 1,
  },
  {
    text: formatDate(new Date(2019, 7, 13, 0, 0), LONG_WEEK_DAY_OPTIONS),
    id: 2,
  },
  {
    text: formatDate(new Date(2019, 7, 14, 0, 0), LONG_WEEK_DAY_OPTIONS),
    id: 3,
  },
  {
    text: formatDate(new Date(2019, 7, 15, 0, 0), LONG_WEEK_DAY_OPTIONS),
    id: 4,
  },
  {
    text: formatDate(new Date(2019, 7, 16, 0, 0), LONG_WEEK_DAY_OPTIONS),
    id: 5,
  },
  {
    text: formatDate(new Date(2019, 7, 17, 0, 0), LONG_WEEK_DAY_OPTIONS),
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

export const getMonthsWithOf = getMessage => [
  {
    text: getMessage('ofJanuaryLabel'),
    id: 1,
  },
  {
    text: getMessage('ofFebruaryLabel'),
    id: 2,
  },
  {
    text: getMessage('ofMarchLabel'),
    id: 3,
  },
  {
    text: getMessage('ofAprilLabel'),
    id: 4,
  },
  {
    text: getMessage('ofMayLabel'),
    id: 5,
  },
  {
    text: getMessage('ofJuneLabel'),
    id: 6,
  },
  {
    text: getMessage('ofJulyLabel'),
    id: 7,
  },
  {
    text: getMessage('ofAugustLabel'),
    id: 8,
  },
  {
    text: getMessage('ofSeptemberLabel'),
    id: 9,
  },
  {
    text: getMessage('ofOctoberLabel'),
    id: 10,
  },
  {
    text: getMessage('ofNovemberLabel'),
    id: 11,
  },
  {
    text: getMessage('ofDecemberLabel'),
    id: 12,
  },
];

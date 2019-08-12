export const handleStartDateChange = (
  newStartDay,
  changeRecurrenceOptionsAction,
  options,
) => {
  if (newStartDay <= 31) {
    const newOptions = { ...options, bymonthday: newStartDay };
    changeRecurrenceOptionsAction(newOptions);
  }
};

export const handleToDayOfWeekChange = (
  weekNumber,
  dayOfWeek,
  changeRecurrenceOptionsAction,
  options,
) => {
  if (weekNumber < 4) {
    const newOptions = {
      ...options,
      bymonthday: [
        weekNumber * 7 + 1,
        weekNumber * 7 + 2,
        weekNumber * 7 + 3,
        weekNumber * 7 + 4,
        weekNumber * 7 + 5,
        weekNumber * 7 + 6,
        weekNumber * 7 + 7,
      ],
      byweekday: dayOfWeek > 0 ? dayOfWeek - 1 : 6,
    };
    changeRecurrenceOptionsAction(newOptions);
  } else {
    const newOptions = {
      ...options,
      bymonthday: [-1, -2, -3, -4, -5, -6, -7],
      byweekday: dayOfWeek > 0 ? dayOfWeek - 1 : 6,
    };
    changeRecurrenceOptionsAction(newOptions);
  }
};

export const handleWeekNumberChange = (
  newWeekNumber,
  changeRecurrenceOptionsAction,
  options,
) => {
  if (newWeekNumber < 4) {
    const newOptions = {
      ...options,
      bymonthday: [
        newWeekNumber * 7 + 1,
        newWeekNumber * 7 + 2,
        newWeekNumber * 7 + 3,
        newWeekNumber * 7 + 4,
        newWeekNumber * 7 + 5,
        newWeekNumber * 7 + 6,
        newWeekNumber * 7 + 7,
      ],
    };
    changeRecurrenceOptionsAction(newOptions);
  } else {
    const newOptions = {
      ...options,
      bymonthday: [-1, -2, -3, -4, -5, -6, -7],
    };
    changeRecurrenceOptionsAction(newOptions);
  }
};

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

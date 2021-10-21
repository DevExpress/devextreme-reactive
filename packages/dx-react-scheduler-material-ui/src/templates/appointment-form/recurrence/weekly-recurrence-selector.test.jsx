import * as React from 'react';
import { createShallow, getClasses } from '@devexpress/dx-testing';
import {
  getRecurrenceOptions, SUNDAY_DATE, WEEK_DAY_OPTIONS, MONDAY_DATE,
  TUESDAY_DATE, THURSDAY_DATE, FRIDAY_DATE, SATURDAY_DATE, WEDNESDAY_DATE,
  changeRecurrenceOptions, RRULE_DAYS_OF_WEEK,
} from '@devexpress/dx-scheduler-core';
import Button from '@mui/material/Button';
import { WeeklyRecurrenceSelector } from './weekly-recurrence-selector';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...jest.requireActual('@devexpress/dx-scheduler-core'),
  handleStartDateChange: jest.fn(),
  getRecurrenceOptions: jest.fn(),
  changeRecurrenceOptions: jest.fn(),
}));

describe('AppointmentForm recurrence', () => {
  const defaultProps = {
    rRule: 'RRULE:FREQ=WEEKLY',
    formatDate: jest.fn(),
    firstDayOfWeek: 0,
  };
  let shallow;
  let classes;
  beforeEach(() => {
    getRecurrenceOptions.mockImplementation(() => ({}));
    changeRecurrenceOptions.mockImplementation(testValue => testValue);
  });
  beforeAll(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<WeeklyRecurrenceSelector {...defaultProps} />);
  });
  describe('WeeklyRecurrenceSelector', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <WeeklyRecurrenceSelector className="custom-class" {...defaultProps} />
      ));

      expect(tree.is(`.${classes.buttonGroup}.custom-class`))
        .toBeTruthy();
    });

    it('should pass rest props into the root element', () => {
      const tree = shallow((
        <WeeklyRecurrenceSelector data={{ a: 1 }} {...defaultProps} />
      ));

      expect(tree.prop('data'))
        .toMatchObject({ a: 1 });
    });

    it('should render buttons correctly', () => {
      const tree = shallow((
        <WeeklyRecurrenceSelector {...defaultProps} />
      ));

      const buttons = tree.find(Button);
      expect(buttons.at(0).is(`.${classes.selectedButton}`)).toBeFalsy();
      expect(buttons.at(0).is(`.${classes.button}`)).toBeTruthy();
      expect(buttons.at(1).is(`.${classes.selectedButton}`)).toBeFalsy();
      expect(buttons.at(1).is(`.${classes.button}`)).toBeTruthy();
      expect(buttons.at(2).is(`.${classes.selectedButton}`)).toBeFalsy();
      expect(buttons.at(2).is(`.${classes.button}`)).toBeTruthy();
      expect(buttons.at(3).is(`.${classes.selectedButton}`)).toBeFalsy();
      expect(buttons.at(3).is(`.${classes.button}`)).toBeTruthy();
      expect(buttons.at(4).is(`.${classes.selectedButton}`)).toBeFalsy();
      expect(buttons.at(4).is(`.${classes.button}`)).toBeTruthy();
      expect(buttons.at(5).is(`.${classes.selectedButton}`)).toBeFalsy();
      expect(buttons.at(5).is(`.${classes.button}`)).toBeTruthy();
      expect(buttons.at(6).is(`.${classes.selectedButton}`)).toBeFalsy();
      expect(buttons.at(6).is(`.${classes.button}`)).toBeTruthy();
    });

    it('should render selected buttons correctly', () => {
      getRecurrenceOptions.mockImplementation(() => ({
        byweekday: [
          RRULE_DAYS_OF_WEEK[0],
          RRULE_DAYS_OF_WEEK[1],
          RRULE_DAYS_OF_WEEK[2],
          RRULE_DAYS_OF_WEEK[3],
          RRULE_DAYS_OF_WEEK[4],
          RRULE_DAYS_OF_WEEK[5],
          RRULE_DAYS_OF_WEEK[6],
        ],
      }));
      const tree = shallow((
        <WeeklyRecurrenceSelector {...defaultProps} />
      ));

      const buttons = tree.find(Button);
      expect(buttons.at(0).is(`.${classes.selectedButton}`)).toBeTruthy();
      expect(buttons.at(0).is(`.${classes.button}`)).toBeTruthy();
      expect(buttons.at(1).is(`.${classes.selectedButton}`)).toBeTruthy();
      expect(buttons.at(1).is(`.${classes.button}`)).toBeTruthy();
      expect(buttons.at(2).is(`.${classes.selectedButton}`)).toBeTruthy();
      expect(buttons.at(2).is(`.${classes.button}`)).toBeTruthy();
      expect(buttons.at(3).is(`.${classes.selectedButton}`)).toBeTruthy();
      expect(buttons.at(3).is(`.${classes.button}`)).toBeTruthy();
      expect(buttons.at(4).is(`.${classes.selectedButton}`)).toBeTruthy();
      expect(buttons.at(4).is(`.${classes.button}`)).toBeTruthy();
      expect(buttons.at(5).is(`.${classes.selectedButton}`)).toBeTruthy();
      expect(buttons.at(5).is(`.${classes.button}`)).toBeTruthy();
      expect(buttons.at(6).is(`.${classes.selectedButton}`)).toBeTruthy();
      expect(buttons.at(6).is(`.${classes.button}`)).toBeTruthy();
    });

    it('should call onValueChange on button click', () => {
      const onFieldChange = jest.fn();
      const tree = shallow((
        <WeeklyRecurrenceSelector
          {...defaultProps}
          onValueChange={onFieldChange}
        />
      ));

      const buttons = tree.find(Button);

      buttons.forEach((button, index) => {
        const validIndex = index === 0 ? 6 : index - 1;

        button.simulate('click');
        expect(onFieldChange)
          .toHaveBeenLastCalledWith({
            rRule: {
              ...getRecurrenceOptions(),
              byweekday: [RRULE_DAYS_OF_WEEK[validIndex]],
            },
          });
      });
    });

    it('should call formatDate function with proper parameter', () => {
      shallow((
        <WeeklyRecurrenceSelector {...defaultProps} />
      ));

      expect(defaultProps.formatDate)
        .toBeCalledWith(SUNDAY_DATE, WEEK_DAY_OPTIONS);
      expect(defaultProps.formatDate)
        .toBeCalledWith(MONDAY_DATE, WEEK_DAY_OPTIONS);
      expect(defaultProps.formatDate)
        .toBeCalledWith(TUESDAY_DATE, WEEK_DAY_OPTIONS);
      expect(defaultProps.formatDate)
        .toBeCalledWith(WEDNESDAY_DATE, WEEK_DAY_OPTIONS);
      expect(defaultProps.formatDate)
        .toBeCalledWith(THURSDAY_DATE, WEEK_DAY_OPTIONS);
      expect(defaultProps.formatDate)
        .toBeCalledWith(FRIDAY_DATE, WEEK_DAY_OPTIONS);
      expect(defaultProps.formatDate)
        .toBeCalledWith(SATURDAY_DATE, WEEK_DAY_OPTIONS);
    });

    it('should be disabled depending on readonly', () => {
      const tree = shallow((
        <WeeklyRecurrenceSelector
          {...defaultProps}
          readOnly
        />
      ));

      expect(tree.prop('disabled'))
        .toBeTruthy();
    });
  });
});

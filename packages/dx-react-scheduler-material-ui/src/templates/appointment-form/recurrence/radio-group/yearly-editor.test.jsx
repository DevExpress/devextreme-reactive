import * as React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import {
  handleStartDateChange,
  handleToDayOfWeekChange,
  handleWeekNumberChange,
  getRecurrenceOptions,
  changeRecurrenceOptions,
  getDaysOfWeek,
  getMonths,
  getWeekNumberLabels,
  getMonthsWithOf,
} from '@devexpress/dx-scheduler-core';
import { YearlyEditor } from './yealy-editor';
import { ChangeMonthEditor } from './change-month-editor';
import { ChangeWeekNumberEditor } from './change-week-number-editor';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...require.requireActual('@devexpress/dx-scheduler-core'),
  handleStartDateChange: jest.fn(),
  handleWeekNumberChange: jest.fn(),
  handleToDayOfWeekChange: jest.fn(),
  getRecurrenceOptions: jest.fn(),
  changeRecurrenceOptions: jest.fn(),
  getDaysOfWeek: jest.fn(),
  getMonths: jest.fn(),
  getMonthsWithOf: jest.fn(),
  getWeekNumberLabels: jest.fn(),
}));

describe('AppointmentForm recurrence RadioGroup', () => {
  const defaultProps = {
    textEditorComponent: () => null,
    labelComponent: () => null,
    selectComponent: () => null,
    onFieldChange: jest.fn(),
    formatDate: jest.fn(),
    getMessage: jest.fn(),
    appointmentData: {
      startDate: new Date(),
      endDate: new Date(),
      rRule: 'RRULE:FREQ=YEARLY',
    },
    firstDayOfWeek: 0,
  };
  let shallow;
  beforeAll(() => {
    shallow = createShallow();
  });
  beforeEach(() => {
    getRecurrenceOptions.mockImplementation(() => ({}));
    changeRecurrenceOptions.mockImplementation(testValue => testValue);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  describe('YearlyEditor', () => {
    it('should pass rest props into the root element', () => {
      const tree = shallow((
        <YearlyEditor data={{ a: 1 }} {...defaultProps} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should render its components correctly', () => {
      const tree = shallow((
        <YearlyEditor data={{ a: 1 }} {...defaultProps} />
      ));

      const changeMonthEditor = tree.find(ChangeMonthEditor);
      expect(changeMonthEditor)
        .toHaveLength(1);

      const changeWeekNumberEditor = tree.find(ChangeWeekNumberEditor);
      expect(changeWeekNumberEditor)
        .toHaveLength(1);
    });

    it('should handle appointment field change', () => {
      const tree = shallow((
        <YearlyEditor {...defaultProps} />
      ));

      const changeMonthEditor = tree.find(ChangeMonthEditor);

      changeMonthEditor.at(0).prop('changeMonth')('abc');
      expect(defaultProps.onFieldChange)
        .toHaveBeenCalledWith({
          rRule: {
            ...getRecurrenceOptions(),
            bymonth: 'abc',
          },
        });

      const changeWeekNumberEditor = tree.find(ChangeWeekNumberEditor);

      changeWeekNumberEditor.at(0).prop('changeMonth')('bcd');
      expect(defaultProps.onFieldChange)
        .toHaveBeenCalledWith({
          rRule: {
            ...getRecurrenceOptions(),
            bymonth: 'bcd',
          },
        });

      changeWeekNumberEditor.at(0).prop('changeDayOfWeek')(3);
      expect(defaultProps.onFieldChange)
        .toHaveBeenCalledWith({
          rRule: {
            ...getRecurrenceOptions(),
            byweekday: 2,
          },
        });
    });

    it('should handle switching and call a proper handler', () => {
      const tree = shallow((<YearlyEditor {...defaultProps} />));

      tree.prop('onChange')({ target: { value: 'onDayAndMonth' } });
      expect(defaultProps.onFieldChange)
        .toHaveBeenCalledWith({
          rRule: {
            ...getRecurrenceOptions(),
            bymonthday: defaultProps.appointmentData.startDate.getDate(),
          },
        });

      tree.prop('onChange')({ target: { value: 'onDayOfWeek' } });
      const weekNumber = Math.trunc((defaultProps.appointmentData.startDate.getDate() - 1) / 7);
      expect(handleToDayOfWeekChange)
        .toHaveBeenCalledWith(
          weekNumber,
          defaultProps.appointmentData.startDate.getDay(),
          getRecurrenceOptions(),
        );
    });

    it('should call handleWeekNumberChange with correct data', () => {
      const tree = shallow((<YearlyEditor {...defaultProps} />));

      tree.find(ChangeWeekNumberEditor).at(0).prop('changeWeekNumber')('abc');
      expect(handleWeekNumberChange)
        .toHaveBeenCalledWith('abc', getRecurrenceOptions());
    });

    it('should call handleStartDateChange with correct data', () => {
      const tree = shallow((<YearlyEditor {...defaultProps} />));

      tree.find(ChangeMonthEditor).at(0).prop('changeByMonthDay')(21);
      expect(handleStartDateChange)
        .toHaveBeenCalledWith(21, getRecurrenceOptions());
    });

    it('should call getMonths', () => {
      shallow((<YearlyEditor {...defaultProps} />));

      expect(getMonths)
        .toHaveBeenCalled();
    });

    it('should call getDaysOfWeek', () => {
      shallow((<YearlyEditor {...defaultProps} />));

      expect(getDaysOfWeek)
        .toHaveBeenCalled();
    });

    it('should call getWeekNumberLabels', () => {
      shallow((<YearlyEditor {...defaultProps} />));

      expect(getWeekNumberLabels)
        .toHaveBeenCalled();
    });

    it('should call getMonthsWithOf', () => {
      shallow((<YearlyEditor {...defaultProps} />));

      expect(getMonthsWithOf)
        .toHaveBeenCalled();
    });
  });
});

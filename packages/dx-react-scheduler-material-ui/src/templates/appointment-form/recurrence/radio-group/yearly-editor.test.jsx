import * as React from 'react';
import { createShallow, getClasses, createMount } from '@material-ui/core/test-utils';
import {
  handleStartDateChange,
  handleToDayOfWeekChange,
  handleWeekNumberChange,
  getRecurrenceOptions,
} from '@devexpress/dx-scheduler-core';
import { YearlyEditor } from './yealy-editor';
import {
  getDaysOfWeek,
  getMonths,
  getNumberLabels,
} from './helpers';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...require.requireActual('@devexpress/dx-scheduler-core'),
  handleStartDateChange: jest.fn(),
  handleWeekNumberChange: jest.fn(),
  handleToDayOfWeekChange: jest.fn(),
  getRecurrenceOptions: jest.fn(),
}));
jest.mock('./helpers', () => ({
  ...require.requireActual('./helpers'),
  getDaysOfWeek: jest.fn(),
  getMonths: jest.fn(),
  getNumberLabels: jest.fn(),
}));

describe('AppointmentForm recurrence RadioGroup', () => {
  const defaultProps = {
    textEditorComponent: () => null,
    labelComponent: () => null,
    switcherComponent: () => null,
    dateAndTimeEditorComponent: () => null,
    onRecurrenceOptionsChange: jest.fn(),
    getMessage: jest.fn(),
    changedAppointment: {
      startDate: new Date(),
      endDate: new Date(),
      rRule: 'RRULE:FREQ=YEARLY',
    },
  };
  let classes;
  let shallow;
  let mount;
  beforeAll(() => {
    classes = getClasses(<YearlyEditor {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });
  beforeEach(() => {
    mount = createMount();
    getRecurrenceOptions.mockImplementation(() => ({}));
  });
  afterEach(() => {
    mount.cleanUp();
  });
  describe('YearlyEditor', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <YearlyEditor data={{ a: 1 }} {...defaultProps} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should render its components correctly', () => {
      const tree = mount((
        <YearlyEditor data={{ a: 1 }} {...defaultProps} />
      ));

      const labels = tree.find(defaultProps.labelComponent);
      expect(labels)
        .toHaveLength(3);
      expect(labels.at(0).is(`.${classes.label}`))
        .toBeTruthy();
      expect(labels.at(1).is(`.${classes.shortLabel}`))
        .toBeTruthy();
      expect(labels.at(2).is(`.${classes.shortLabel}`))
        .toBeTruthy();

      const textEditor = tree.find(defaultProps.textEditorComponent);
      expect(textEditor)
        .toHaveLength(1);
      expect(textEditor.at(0).is(`.${classes.numberEditor}`))
        .toBeTruthy();

      const switcherComponents = tree.find(defaultProps.switcherComponent);
      expect(switcherComponents)
        .toHaveLength(4);
      expect(switcherComponents.at(0).is(`.${classes.switcher}`))
        .toBeTruthy();
      expect(switcherComponents.at(1).is(`.${classes.switcher}`))
        .toBeTruthy();
      expect(switcherComponents.at(2).is(`.${classes.switcher}`))
        .toBeTruthy();
      expect(switcherComponents.at(3).is(`.${classes.switcher}`))
        .toBeTruthy();
    });

    it('should handle recurrence options change', () => {
      const tree = mount((
        <YearlyEditor {...defaultProps} />
      ));

      const switcherComponents = tree.find(defaultProps.switcherComponent);

      switcherComponents.at(0).prop('onChange')('abc');
      expect(defaultProps.onRecurrenceOptionsChange)
        .toHaveBeenCalledWith({
          ...getRecurrenceOptions(),
          bymonth: 'abc',
        });

      switcherComponents.at(2).prop('onChange')(2);
      expect(defaultProps.onRecurrenceOptionsChange)
        .toHaveBeenCalledWith({
          ...getRecurrenceOptions(),
          byweekday: 1,
        });

      switcherComponents.at(3).prop('onChange')('cde');
      expect(defaultProps.onRecurrenceOptionsChange)
        .toHaveBeenCalledWith({
          ...getRecurrenceOptions(),
          bymonth: 'cde',
        });
    });

    it('should handle switching and call a proper handler', () => {
      const tree = shallow((
        <YearlyEditor {...defaultProps} />
      ));

      tree.prop('onChange')({ target: { value: 'onDayAndMonth' } });
      expect(defaultProps.onRecurrenceOptionsChange)
        .toHaveBeenCalledWith({
          ...getRecurrenceOptions(),
          bymonthday: defaultProps.changedAppointment.startDate.getDate(),
        });

      tree.prop('onChange')({ target: { value: 'onDayOfWeek' } });
      const weekNumber = Math.trunc((defaultProps.changedAppointment.startDate.getDate() - 1) / 7);
      expect(handleToDayOfWeekChange)
        .toHaveBeenCalledWith(
          weekNumber,
          defaultProps.changedAppointment.startDate.getDay(),
          defaultProps.onRecurrenceOptionsChange,
          getRecurrenceOptions(),
        );
    });

    it('should call handleWeekNumberChange with correct data', () => {
      const tree = mount((
        <YearlyEditor {...defaultProps} />
      ));

      tree.find(defaultProps.switcherComponent).at(1).prop('onChange')('abc');
      expect(handleWeekNumberChange)
        .toHaveBeenCalledWith('abc', defaultProps.onRecurrenceOptionsChange, getRecurrenceOptions());
    });

    it('should call handleStartDateChange with correct data', () => {
      const tree = mount((
        <YearlyEditor {...defaultProps} />
      ));

      tree.find(defaultProps.textEditorComponent).at(0).prop('onValueChange')('abc');
      expect(handleStartDateChange)
        .toHaveBeenCalledWith('abc', defaultProps.onRecurrenceOptionsChange, getRecurrenceOptions());
    });

    it('should call getMessage with proper parameters', () => {
      shallow((
        <YearlyEditor {...defaultProps} />
      ));

      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('theLabel');
      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('ofLabel');
    });

    it('should call getMonths', () => {
      shallow((
        <YearlyEditor {...defaultProps} />
      ));

      expect(getMonths)
        .toHaveBeenCalled();
    });

    it('should call getDaysOfWeek', () => {
      shallow((
        <YearlyEditor {...defaultProps} />
      ));

      expect(getDaysOfWeek)
        .toHaveBeenCalled();
    });

    it('should call getNumberLabels', () => {
      shallow((
        <YearlyEditor {...defaultProps} />
      ));

      expect(getNumberLabels)
        .toHaveBeenCalled();
    });
  });
});

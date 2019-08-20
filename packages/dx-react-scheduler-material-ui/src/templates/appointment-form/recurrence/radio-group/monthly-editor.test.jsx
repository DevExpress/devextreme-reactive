import * as React from 'react';
import { createShallow, getClasses, createMount } from '@material-ui/core/test-utils';
import {
  handleStartDateChange,
  handleToDayOfWeekChange,
  handleWeekNumberChange,
  getRecurrenceOptions,
  changeRecurrenceOptions,
} from '@devexpress/dx-scheduler-core';
import { MonthlyEditor } from './monthly-editor';
import {
  getDaysOfWeek,
  getNumberLabels,
} from '../../helpers';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...require.requireActual('@devexpress/dx-scheduler-core'),
  handleStartDateChange: jest.fn(),
  handleWeekNumberChange: jest.fn(),
  handleToDayOfWeekChange: jest.fn(),
  getRecurrenceOptions: jest.fn(),
  changeRecurrenceOptions: jest.fn(),
}));
jest.mock('../../helpers', () => ({
  ...require.requireActual('../../helpers'),
  getDaysOfWeek: jest.fn(),
  getMonths: jest.fn(),
  getNumberLabels: jest.fn(),
}));

describe('AppointmentForm recurrence RadioGroup', () => {
  const defaultProps = {
    textEditorComponent: () => null,
    labelComponent: () => null,
    selectComponent: () => null,
    onAppointmentFieldChange: jest.fn(),
    getMessage: jest.fn(),
    changedAppointment: {
      startDate: new Date(),
      endDate: new Date(),
      rRule: 'RRULE:FREQ=YEARLY',
    },
    formatDate: jest.fn(),
  };
  let classes;
  let shallow;
  let mount;
  beforeAll(() => {
    classes = getClasses(<MonthlyEditor {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });
  beforeEach(() => {
    mount = createMount();
    getRecurrenceOptions.mockImplementation(() => ({}));
    changeRecurrenceOptions.mockImplementation(testValue => testValue);
  });
  afterEach(() => {
    mount.cleanUp();
  });
  describe('MonthlyEditor', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <MonthlyEditor data={{ a: 1 }} {...defaultProps} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should render its components correctly', () => {
      const tree = mount((
        <MonthlyEditor data={{ a: 1 }} {...defaultProps} />
      ));

      const labels = tree.find(defaultProps.labelComponent);
      expect(labels)
        .toHaveLength(3);
      expect(labels.at(0).is(`.${classes.label}`))
        .toBeTruthy();
      expect(labels.at(2).is(`.${classes.label}`))
        .toBeTruthy();

      const textEditor = tree.find(defaultProps.textEditorComponent);
      expect(textEditor)
        .toHaveLength(1);
      expect(textEditor.at(0).is(`.${classes.textEditor}`))
        .toBeTruthy();

      const selectComponents = tree.find(defaultProps.selectComponent);
      expect(selectComponents)
        .toHaveLength(2);
      expect(selectComponents.at(0).is(`.${classes.select}`))
        .toBeTruthy();
      expect(selectComponents.at(1).is(`.${classes.longSelect}`))
        .toBeTruthy();
    });

    it('should handle appointment field change', () => {
      const tree = mount((
        <MonthlyEditor {...defaultProps} />
      ));

      const selectComponents = tree.find(defaultProps.selectComponent);

      selectComponents.at(1).prop('onChange')(2);
      expect(defaultProps.onAppointmentFieldChange)
        .toHaveBeenCalledWith({
          rRule: {
            ...getRecurrenceOptions(),
            byweekday: 1,
          },
        });
    });

    it('should handle switching and call a proper handler', () => {
      const tree = shallow((
        <MonthlyEditor {...defaultProps} />
      ));

      tree.prop('onChange')({ target: { value: 'onDayNumber' } });
      expect(defaultProps.onAppointmentFieldChange)
        .toHaveBeenCalledWith({
          rRule: {
            ...getRecurrenceOptions(),
            bymonthday: defaultProps.changedAppointment.startDate.getDate(),
          },
        });

      tree.prop('onChange')({ target: { value: 'onDayOfWeek' } });
      const weekNumber = Math.trunc((defaultProps.changedAppointment.startDate.getDate() - 1) / 7);
      expect(handleToDayOfWeekChange)
        .toHaveBeenCalledWith(
          weekNumber,
          defaultProps.changedAppointment.startDate.getDay(),
          defaultProps.onAppointmentFieldChange,
          getRecurrenceOptions(),
        );
    });

    it('should call handleWeekNumberChange with correct data', () => {
      const tree = mount((
        <MonthlyEditor {...defaultProps} />
      ));

      tree.find(defaultProps.selectComponent).at(0).prop('onChange')('abc');
      expect(handleWeekNumberChange)
        .toHaveBeenCalledWith('abc', defaultProps.onAppointmentFieldChange, getRecurrenceOptions());
    });

    it('should call handleStartDateChange with correct data', () => {
      const tree = mount((
        <MonthlyEditor {...defaultProps} />
      ));

      tree.find(defaultProps.textEditorComponent).at(0).prop('onValueChange')('abc');
      expect(handleStartDateChange)
        .toHaveBeenCalledWith('abc', defaultProps.onAppointmentFieldChange, getRecurrenceOptions());
    });

    it('should call getMessage with proper parameters', () => {
      shallow((
        <MonthlyEditor {...defaultProps} />
      ));

      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('onLabel');
      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('ofEveryMonthLabel');
      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('theLabel');
    });

    it('should call getDaysOfWeek', () => {
      shallow((
        <MonthlyEditor {...defaultProps} />
      ));

      expect(getDaysOfWeek)
        .toHaveBeenCalled();
    });

    it('should call getNumberLabels', () => {
      shallow((
        <MonthlyEditor {...defaultProps} />
      ));

      expect(getNumberLabels)
        .toHaveBeenCalled();
    });
  });
});

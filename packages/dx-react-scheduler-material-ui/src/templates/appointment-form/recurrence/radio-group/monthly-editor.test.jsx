import * as React from 'react';
import { createShallow, getClasses, createMount } from '@mui/material/test-utils';
import {
  handleStartDateChange,
  handleToDayOfWeekChange,
  getRecurrenceOptions,
  changeRecurrenceOptions,
  getDaysOfWeek,
  getWeekNumberLabels,
} from '@devexpress/dx-scheduler-core';
import FormControlLabel from '@mui/material/FormControlLabel';
import { MonthlyEditor } from './monthly-editor';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...jest.requireActual('@devexpress/dx-scheduler-core'),
  handleStartDateChange: jest.fn(),
  handleToDayOfWeekChange: jest.fn(),
  getRecurrenceOptions: jest.fn(),
  changeRecurrenceOptions: jest.fn(),
  getDaysOfWeek: jest.fn(),
  getMonths: jest.fn(),
  getWeekNumberLabels: jest.fn(),
  firstDayOfWeek: 0,
}));

describe('AppointmentForm recurrence RadioGroup', () => {
  const defaultProps = {
    textEditorComponent: () => null,
    labelComponent: () => null,
    selectComponent: () => null,
    onFieldChange: jest.fn(),
    getMessage: jest.fn(),
    appointmentData: {
      startDate: new Date(2020, 9, 16, 0, 0),
      endDate: new Date(2020, 9, 16, 1, 0),
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
    jest.resetAllMocks();
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
      expect(labels.at(1).is(`.${classes.longLabel}`))
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

      handleToDayOfWeekChange.mockImplementationOnce(() => 'New rrule');
      const dayOfWeek = 2;

      selectComponents.at(1).prop('onValueChange')(dayOfWeek);

      expect(handleToDayOfWeekChange)
        .toHaveBeenCalledWith(2, dayOfWeek, getRecurrenceOptions());
      expect(defaultProps.onFieldChange)
        .toHaveBeenCalledWith({
          rRule: 'New rrule',
        });
    });

    it('should handle switching and call a proper handler', () => {
      const tree = shallow((
        <MonthlyEditor {...defaultProps} />
      ));

      tree.prop('onChange')({ target: { value: 'onDayNumber' } });
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

    it('should change week number correctly', () => {
      const tree = mount((
        <MonthlyEditor {...defaultProps} />
      ));

      tree.find(defaultProps.selectComponent).at(0).prop('onValueChange')('abc');
      expect(handleToDayOfWeekChange)
        .toHaveBeenCalledWith(
          'abc',
          defaultProps.appointmentData.startDate.getDay(),
          getRecurrenceOptions(),
        );
    });

    it('should call handleStartDateChange with correct data', () => {
      const tree = mount((
        <MonthlyEditor {...defaultProps} />
      ));

      tree.find(defaultProps.textEditorComponent).at(0).prop('onValueChange')('abc');
      expect(handleStartDateChange)
        .toHaveBeenCalledWith('abc', getRecurrenceOptions());
    });

    it('should call getMessage with proper parameters', () => {
      shallow((<MonthlyEditor {...defaultProps} />));

      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('onLabel');
      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('ofEveryMonthLabel');
      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('theLabel');
    });

    it('should call getDaysOfWeek', () => {
      shallow((<MonthlyEditor {...defaultProps} />));

      expect(getDaysOfWeek)
        .toHaveBeenCalled();
    });

    it('should call getWeekNumberLabels', () => {
      shallow((<MonthlyEditor {...defaultProps} />));

      expect(getWeekNumberLabels)
        .toHaveBeenCalled();
    });

    it('should be read-only if readOnly is true', () => {
      const tree = shallow((<MonthlyEditor {...defaultProps} readOnly />));

      const formControlLabels = tree.find(FormControlLabel);

      expect(formControlLabels.at(0).prop('disabled'))
        .toBeTruthy();
      expect(formControlLabels.at(1).prop('disabled'))
        .toBeTruthy();
    });
  });
});

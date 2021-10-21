import * as React from 'react';
import { createShallow, getClasses } from '@devexpress/dx-testing';
import { getRecurrenceOptions, changeRecurrenceOptions } from '@devexpress/dx-scheduler-core';
import { Yearly } from './yearly';
import { IntervalEditor } from './interval-editor';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...jest.requireActual('@devexpress/dx-scheduler-core'),
  getRecurrenceOptions: jest.fn(),
  changeRecurrenceOptions: jest.fn(),
}));

describe('AppointmentForm recurrence layout', () => {
  const defaultProps = {
    textEditorComponent: () => null,
    labelComponent: () => null,
    radioGroupComponent: () => null,
    selectComponent: () => null,
    weeklyRecurrenceSelectorComponent: () => null,
    onFieldChange: jest.fn(),
    getMessage: jest.fn(),
    formatDate: jest.fn(),
    appointmentData: {},
    firstDayOfWeek: 0,
  };
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<Yearly {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });
  beforeEach(() => {
    getRecurrenceOptions.mockImplementation(() => ({}));
    changeRecurrenceOptions.mockImplementation(testValue => testValue);
  });
  describe('Yearly', () => {
    it('should pass rest props into the root element', () => {
      const tree = shallow((
        <Yearly data={{ a: 1 }} {...defaultProps} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should render its components correctly', () => {
      const tree = shallow((
        <Yearly data={{ a: 1 }} {...defaultProps} />
      ));

      const intervalEditor = tree.find(IntervalEditor);
      expect(intervalEditor)
        .toHaveLength(1);

      const radioGroup = tree.find(defaultProps.radioGroupComponent);
      expect(radioGroup)
        .toHaveLength(1);
      expect(radioGroup.at(0).is(`.${classes.radioGroup}`))
        .toBeTruthy();
    });

    it('should handle appointment field changes', () => {
      const tree = shallow((
        <Yearly {...defaultProps} />
      ));

      tree.find(IntervalEditor).at(0).prop('changeRecurrenceInterval')(23);
      expect(defaultProps.onFieldChange)
        .toHaveBeenCalledWith({
          rRule: {
            ...getRecurrenceOptions(),
            interval: 23,
          },
        });

      tree.find(defaultProps.radioGroupComponent).at(0)
        .simulate('fieldChange', 'abc');
      expect(defaultProps.onFieldChange)
        .toHaveBeenCalledWith('abc');
    });

    it('should call getMessage with proper parameters', () => {
      shallow((
        <Yearly {...defaultProps} />
      ));

      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('repeatEveryLabel');
      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('yearsLabel');
    });

    it('should work even if rule is undefined', () => {
      const tree = shallow((
        <Yearly {...defaultProps} appointmentData={{}} />
      ));

      expect(tree.exists())
        .toBeTruthy();
    });
  });
});

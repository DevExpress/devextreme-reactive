import * as React from 'react';
import { createShallow, getClasses } from '@mui/material/test-utils';
import { getRecurrenceOptions, changeRecurrenceOptions } from '@devexpress/dx-scheduler-core';
import { Weekly } from './weekly';
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
    classes = getClasses(<Weekly {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });
  beforeEach(() => {
    getRecurrenceOptions.mockImplementation(() => ({}));
    changeRecurrenceOptions.mockImplementation(testValue => testValue);
  });
  describe('Weekly', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Weekly data={{ a: 1 }} {...defaultProps} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should render its components correctly', () => {
      const tree = shallow((
        <Weekly data={{ a: 1 }} {...defaultProps} />
      ));

      const intervalEditor = tree.find(IntervalEditor);
      expect(intervalEditor)
        .toHaveLength(1);

      const weeklyRecurrenceSelector = tree.find(defaultProps.weeklyRecurrenceSelectorComponent);
      expect(weeklyRecurrenceSelector)
        .toHaveLength(1);

      expect(tree.find(`.${classes.container}`))
        .toHaveLength(1);
    });

    it('should handle appointment field changes', () => {
      const tree = shallow((<Weekly {...defaultProps} />));

      tree.find(IntervalEditor).at(0).prop('changeRecurrenceInterval')(23);
      expect(defaultProps.onFieldChange)
        .toHaveBeenCalledWith({
          rRule: {
            ...getRecurrenceOptions(),
            interval: 23,
          },
        });

      tree.find(defaultProps.weeklyRecurrenceSelectorComponent).at(0)
        .simulate('valueChange', 'abc');
      expect(defaultProps.onFieldChange)
        .toHaveBeenCalledWith('abc');
    });

    it('should call getMessage with proper parameters', () => {
      shallow((
        <Weekly {...defaultProps} />
      ));

      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('repeatEveryLabel');
      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('weeksOnLabel');
    });

    it('should work even if rule is undefined', () => {
      const tree = shallow((
        <Weekly {...defaultProps} appointmentData={{}} />
      ));

      expect(tree.exists())
        .toBeTruthy();
    });
  });
});

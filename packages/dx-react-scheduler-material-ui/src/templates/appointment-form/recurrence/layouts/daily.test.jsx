import * as React from 'react';
import { createShallow } from '@mui/material/test-utils';
import { getRecurrenceOptions, changeRecurrenceOptions } from '@devexpress/dx-scheduler-core';
import { Daily } from './daily';
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
  let shallow;
  beforeAll(() => {
    shallow = createShallow();
  });
  beforeEach(() => {
    getRecurrenceOptions.mockImplementation(() => ({}));
    changeRecurrenceOptions.mockImplementation(testValue => testValue);
  });
  describe('Daily', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Daily data={{ a: 1 }} {...defaultProps} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should render its components correctly', () => {
      const tree = shallow((
        <Daily data={{ a: 1 }} {...defaultProps} />
      ));

      const intervalEditor = tree.find(IntervalEditor);
      expect(intervalEditor)
        .toHaveLength(1);
    });

    it('should handle appointment field changes', () => {
      const tree = shallow((
        <Daily {...defaultProps} />
      ));

      tree.find(IntervalEditor).at(0).prop('changeRecurrenceInterval')(23);
      expect(defaultProps.onFieldChange)
        .toHaveBeenCalledWith({
          rRule: {
            ...getRecurrenceOptions(),
            interval: 23,
          },
        });
    });

    it('should have call getMessage with proper parameters', () => {
      shallow((
        <Daily {...defaultProps} />
      ));

      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('repeatEveryLabel');
      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('daysLabel');
    });

    it('should work even if rule is undefined', () => {
      const tree = shallow((
        <Daily {...defaultProps} appointmentData={{}} />
      ));

      expect(tree.exists())
        .toBeTruthy();
    });
  });
});

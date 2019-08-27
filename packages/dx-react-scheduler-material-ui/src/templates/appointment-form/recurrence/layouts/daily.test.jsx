import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { getRecurrenceOptions, changeRecurrenceOptions } from '@devexpress/dx-scheduler-core';
import { Daily } from './daily';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...require.requireActual('@devexpress/dx-scheduler-core'),
  getRecurrenceOptions: jest.fn(),
  changeRecurrenceOptions: jest.fn(),
}));

describe('AppointmentForm recurrence layout ', () => {
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
  };
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<Daily {...defaultProps} />);
    shallow = createShallow({ dive: true });
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

      const labels = tree.find(defaultProps.labelComponent);
      expect(labels)
        .toHaveLength(2);
      expect(labels.at(0).is(`.${classes.label}`))
        .toBeTruthy();
      expect(labels.at(1).is(`.${classes.labelWithMargin}`))
        .toBeTruthy();

      const textEditor = tree.find(defaultProps.textEditorComponent);
      expect(textEditor)
        .toHaveLength(1);
      expect(textEditor.at(0).is(`.${classes.textEditor}`))
        .toBeTruthy();

      expect(tree.find(`.${classes.grid}`))
        .toHaveLength(1);
    });

    it('should handle recurrence options change', () => {
      const tree = shallow((
        <Daily {...defaultProps} />
      ));

      tree.find(defaultProps.textEditorComponent).at(0)
        .simulate('valueChange', 'abc');
      expect(defaultProps.onFieldChange)
        .toHaveBeenCalledWith({
          rRule: {
            ...getRecurrenceOptions(),
            interval: 'abc',
          },
        });
    });

    it('should have getMessage called with proper parameters', () => {
      shallow((
        <Daily {...defaultProps} />
      ));

      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('repeatEveryLabel');
      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('daysLabel');
    });
  });
});

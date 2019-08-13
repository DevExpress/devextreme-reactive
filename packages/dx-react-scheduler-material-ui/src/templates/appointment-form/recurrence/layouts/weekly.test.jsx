import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { getRecurrenceOptions } from '@devexpress/dx-scheduler-core';
import { Weekly } from './weekly';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...require.requireActual('@devexpress/dx-scheduler-core'),
  getRecurrenceOptions: jest.fn(),
}));

describe('AppointmentForm recurrence layout', () => {
  const defaultProps = {
    textEditorComponent: () => null,
    labelComponent: () => null,
    radioGroupEditorComponent: () => null,
    switcherComponent: () => null,
    groupedButtonsComponent: () => null,
    onRecurrenceOptionsChange: jest.fn(),
    onAppointmentFieldChange: jest.fn(),
    recurrenceOptions: {},
    getMessage: jest.fn(),
    changedAppointment: {},
  };
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<Weekly {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });
  beforeEach(() => {
    getRecurrenceOptions.mockImplementation(() => ({}));
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

      const labels = tree.find(defaultProps.labelComponent);
      expect(labels)
        .toHaveLength(2);
      expect(labels.at(0).is(`.${classes.label}`))
        .toBeTruthy();
      expect(labels.at(1).is(`.${classes.label}`))
        .toBeTruthy();

      const textEditor = tree.find(defaultProps.textEditorComponent);
      expect(textEditor)
        .toHaveLength(1);
      expect(textEditor.at(0).is(`.${classes.textEditor}`))
        .toBeTruthy();

      const groupedButtons = tree.find(defaultProps.groupedButtonsComponent);
      expect(groupedButtons)
        .toHaveLength(1);
    });

    it('should handle interval change', () => {
      const tree = shallow((
        <Weekly {...defaultProps} />
      ));

      tree.find(defaultProps.textEditorComponent).at(0)
        .simulate('valueChange', 'abc');
      expect(defaultProps.onRecurrenceOptionsChange)
        .toHaveBeenCalledWith({
          ...defaultProps.recurrenceOptions,
          interval: 'abc',
        });
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
  });
});

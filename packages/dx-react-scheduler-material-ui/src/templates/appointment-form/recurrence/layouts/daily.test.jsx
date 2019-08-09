import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Daily } from './daily';

describe('AppointmentForm recurrence layout', () => {
  const defaultProps = {
    textEditorComponent: () => null,
    labelComponent: () => null,
    radioGroupEditorComponent: () => null,
    switcherComponent: () => null,
    booleanEditorComponent: () => null,
    onRecurrenceOptionsChange: jest.fn(),
    onAppointmentFieldChange: jest.fn(),
    recurrenceOptions: {},
    getMessage: jest.fn(),
    changedAppointment: {},
  };
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<Daily {...defaultProps} />);
    shallow = createShallow({ dive: true });
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
      expect(labels.at(1).is(`.${classes.label}`))
        .toBeTruthy();

      const textEditor = tree.find(defaultProps.textEditorComponent);
      expect(textEditor)
        .toHaveLength(1);
      expect(textEditor.at(0).is(`.${classes.textEditor}`))
        .toBeTruthy();
    });

    it('should handle recurrence options change', () => {
      const tree = shallow((
        <Daily {...defaultProps} />
      ));

      tree.find(defaultProps.textEditorComponent).at(0)
        .simulate('valueChange', 'abc');
      expect(defaultProps.onRecurrenceOptionsChange)
        .toHaveBeenCalledWith({
          ...defaultProps.recurrenceOptions,
          interval: 'abc',
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

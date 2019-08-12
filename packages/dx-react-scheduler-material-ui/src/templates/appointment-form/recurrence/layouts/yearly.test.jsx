import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Yearly } from './yearly';

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
    classes = getClasses(<Yearly {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });
  describe('Yearly', () => {
    it('should pass rest props to the root element', () => {
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

      const radioGroupEditor = tree.find(defaultProps.radioGroupEditorComponent);
      expect(radioGroupEditor)
        .toHaveLength(1);
    });

    it('should handle recurrence options change', () => {
      const tree = shallow((
        <Yearly {...defaultProps} />
      ));

      tree.find(defaultProps.textEditorComponent).at(0)
        .simulate('valueChange', 'abc');
      expect(defaultProps.onRecurrenceOptionsChange)
        .toHaveBeenCalledWith({
          ...defaultProps.recurrenceOptions,
          interval: 'abc',
        });

      tree.find(defaultProps.radioGroupEditorComponent).at(0)
        .simulate('recurrenceOptionsChange', 'bcd');
      expect(defaultProps.onRecurrenceOptionsChange)
        .toHaveBeenCalledWith('bcd');
    });

    it('should handle appointment field change', () => {
      const tree = shallow((
        <Yearly {...defaultProps} />
      ));

      tree.find(defaultProps.radioGroupEditorComponent).at(0)
        .simulate('appointmentFieldChange', 'abc');
      expect(defaultProps.onAppointmentFieldChange)
        .toHaveBeenCalledWith('abc');
    });

    it('should have getMessage called with proper parameters', () => {
      shallow((
        <Yearly {...defaultProps} />
      ));

      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('repeatEveryLabel');
      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('yearsLabel');
    });
  });
});

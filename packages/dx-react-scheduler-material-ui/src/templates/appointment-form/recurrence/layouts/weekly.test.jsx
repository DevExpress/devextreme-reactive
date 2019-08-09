import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Weekly } from './weekly';

describe('AppointmentForm', () => {
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
    classes = getClasses(<Weekly {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });
  describe('Layout', () => {
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

      const booleanEditors = tree.find(defaultProps.booleanEditorComponent);
      expect(booleanEditors)
        .toHaveLength(7);
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

    it('should handle change of Sunday', () => {
      const tree = shallow((
        <Weekly {...defaultProps} />
      ));

      const booleanEditors = tree.find(defaultProps.booleanEditorComponent)
      booleanEditors.at(0).simulate('valueChange', true);
      expect(defaultProps.onRecurrenceOptionsChange)
        .toHaveBeenCalledWith({
          ...defaultProps.recurrenceOptions,
          byweekday: [6],
        });
      booleanEditors.at(0).simulate('valueChange', false);
      expect(defaultProps.onRecurrenceOptionsChange)
        .toHaveBeenCalledWith({
          ...defaultProps.recurrenceOptions,
          byweekday: [],
        });
    });

    it('should handle change of Monday', () => {
      const tree = shallow((
        <Weekly {...defaultProps} />
      ));

      const booleanEditors = tree.find(defaultProps.booleanEditorComponent)
      booleanEditors.at(1).simulate('valueChange', true);
      expect(defaultProps.onRecurrenceOptionsChange)
        .toHaveBeenCalledWith({
          ...defaultProps.recurrenceOptions,
          byweekday: [0],
        });
      booleanEditors.at(1).simulate('valueChange', false);
      expect(defaultProps.onRecurrenceOptionsChange)
        .toHaveBeenCalledWith({
          ...defaultProps.recurrenceOptions,
          byweekday: [],
        });
    });

    it('should handle change of Tuesday', () => {
      const tree = shallow((
        <Weekly {...defaultProps} />
      ));

      const booleanEditors = tree.find(defaultProps.booleanEditorComponent)
      booleanEditors.at(2).simulate('valueChange', true);
      expect(defaultProps.onRecurrenceOptionsChange)
        .toHaveBeenCalledWith({
          ...defaultProps.recurrenceOptions,
          byweekday: [1],
        });
      booleanEditors.at(2).simulate('valueChange', false);
      expect(defaultProps.onRecurrenceOptionsChange)
        .toHaveBeenCalledWith({
          ...defaultProps.recurrenceOptions,
          byweekday: [],
        });
    });

    it('should handle change of Wednesday', () => {
      const tree = shallow((
        <Weekly {...defaultProps} />
      ));

      const booleanEditors = tree.find(defaultProps.booleanEditorComponent)
      booleanEditors.at(3).simulate('valueChange', true);
      expect(defaultProps.onRecurrenceOptionsChange)
        .toHaveBeenCalledWith({
          ...defaultProps.recurrenceOptions,
          byweekday: [2],
        });
      booleanEditors.at(3).simulate('valueChange', false);
      expect(defaultProps.onRecurrenceOptionsChange)
        .toHaveBeenCalledWith({
          ...defaultProps.recurrenceOptions,
          byweekday: [],
        });
    });

    it('should handle change of Thursday', () => {
      const tree = shallow((
        <Weekly {...defaultProps} />
      ));

      const booleanEditors = tree.find(defaultProps.booleanEditorComponent)
      booleanEditors.at(4).simulate('valueChange', true);
      expect(defaultProps.onRecurrenceOptionsChange)
        .toHaveBeenCalledWith({
          ...defaultProps.recurrenceOptions,
          byweekday: [3],
        });
      booleanEditors.at(4).simulate('valueChange', false);
      expect(defaultProps.onRecurrenceOptionsChange)
        .toHaveBeenCalledWith({
          ...defaultProps.recurrenceOptions,
          byweekday: [],
        });
    });

    it('should handle change of Friday', () => {
      const tree = shallow((
        <Weekly {...defaultProps} />
      ));

      const booleanEditors = tree.find(defaultProps.booleanEditorComponent)
      booleanEditors.at(5).simulate('valueChange', true);
      expect(defaultProps.onRecurrenceOptionsChange)
        .toHaveBeenCalledWith({
          ...defaultProps.recurrenceOptions,
          byweekday: [4],
        });
      booleanEditors.at(5).simulate('valueChange', false);
      expect(defaultProps.onRecurrenceOptionsChange)
        .toHaveBeenCalledWith({
          ...defaultProps.recurrenceOptions,
          byweekday: [],
        });
    });

    it('should handle change of Saturday', () => {
      const tree = shallow((
        <Weekly {...defaultProps} />
      ));

      const booleanEditors = tree.find(defaultProps.booleanEditorComponent)
      booleanEditors.at(6).simulate('valueChange', true);
      expect(defaultProps.onRecurrenceOptionsChange)
        .toHaveBeenCalledWith({
          ...defaultProps.recurrenceOptions,
          byweekday: [5],
        });
      booleanEditors.at(6).simulate('valueChange', false);
      expect(defaultProps.onRecurrenceOptionsChange)
        .toHaveBeenCalledWith({
          ...defaultProps.recurrenceOptions,
          byweekday: [],
        });
    });

    it('should have getMessage called with proper parameters', () => {
      shallow((
        <Weekly {...defaultProps} />
      ));

      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('repeatEveryLabel');
      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('weeksOnLabel');

      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('sunLabel');
      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('monLabel');
      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('tueLabel');
      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('wedLabel');
      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('thuLabel');
      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('friLabel');
      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('satLabel');
    });
  });
});

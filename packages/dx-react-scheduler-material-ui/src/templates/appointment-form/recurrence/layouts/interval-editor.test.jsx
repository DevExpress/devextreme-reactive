import * as React from 'react';
import { createShallow, getClasses } from '@devexpress/dx-testing';
import { IntervalEditor } from './interval-editor';

describe('AppointmentForm recurrence layout', () => {
  const defaultProps = {
    textEditorComponent: () => null,
    labelComponent: () => null,
    repeatEveryLabel: '',
    repeatIntervalLabel: '',
    readOnly: false,
    interval: 1,
    changeRecurrenceInterval: jest.fn(),
  };
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<IntervalEditor {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });
  describe('IntervalEditor', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <IntervalEditor data={{ a: 1 }} {...defaultProps} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should pass classname to the root element', () => {
      const tree = shallow((
        <IntervalEditor className="custom-class" />
      ));

      expect(tree.is(`.${classes.grid}.custom-class`))
        .toBeTruthy();
    });

    it('should render its components correctly', () => {
      const tree = shallow((
        <IntervalEditor {...defaultProps} />
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
      expect(textEditor.at(0).prop('onValueChange'))
        .toEqual(defaultProps.changeRecurrenceInterval);
    });
  });
});

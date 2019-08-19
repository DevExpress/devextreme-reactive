import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import { FULL_DATE_TIME_EDITOR } from '@devexpress/dx-scheduler-core';
import moment from 'moment';
import { DateEditor } from './date-editor';

describe('AppointmentForm common', () => {
  const defaultProps = {
    onDateChange: jest.fn(),
  };
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });

  describe('DateEditor', () => {
    it('should pass rest props to the DateTimePicker element', () => {
      const tree = shallow((
        <DateEditor data={{ a: 1 }} />
      ));

      const datePicker = tree.find(KeyboardDateTimePicker);

      expect(datePicker)
        .toHaveLength(1);
      expect(datePicker.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should pass classNme to the DateTimePicker element', () => {
      const classes = getClasses(<DateEditor />);
      const tree = shallow((
        <DateEditor className="custom-class" />
      ));

      const dateTimePicker = tree.find(KeyboardDateTimePicker);

      expect(dateTimePicker.at(0).is('.custom-class'))
        .toBeTruthy();
      expect(dateTimePicker.at(0).is(`.${classes.dateEditor}`))
        .toBeTruthy();
    });

    it('should handle onChange', () => {
      const tree = shallow((
        <DateEditor {...defaultProps} id={FULL_DATE_TIME_EDITOR} />
      ));

      const dateTimePicker = tree.find(KeyboardDateTimePicker);

      dateTimePicker.at(0).simulate('change');
      expect(defaultProps.onDateChange)
        .toBeCalled();
    });
  });
});

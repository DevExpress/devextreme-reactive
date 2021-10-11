import * as React from 'react';
import { createShallow, getClasses } from '@mui/material/test-utils';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { convertToMoment } from '@devexpress/dx-scheduler-core';
import { DateEditor } from './date-editor';

describe('AppointmentForm common', () => {
  const defaultProps = {
    onValueChange: jest.fn(),
    locale: 'en-US',
  };
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });

  describe('DateEditor', () => {
    it('should pass rest props to the DateTimePicker element', () => {
      const tree = shallow((
        <DateEditor {...defaultProps} data={{ a: 1 }} />
      ));

      const datePicker = tree.find(DateTimePicker);

      expect(datePicker)
        .toHaveLength(1);
      expect(datePicker.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should pass classNme to the DateTimePicker element', () => {
      const classes = getClasses(<DateEditor {...defaultProps} />);
      const tree = shallow((
        <DateEditor {...defaultProps} className="custom-class" />
      ));

      const dateTimePicker = tree.find(DateTimePicker);

      expect(dateTimePicker.at(0).is(`.${classes.dateEditor}.custom-class`))
        .toBeTruthy();
    });

    it('should handle onChange', () => {
      const tree = shallow((
        <DateEditor {...defaultProps} />
      ));

      const dateTimePicker = tree.find(DateTimePicker);

      dateTimePicker.at(0).simulate('change', convertToMoment(new Date()));
      expect(defaultProps.onValueChange)
        .toBeCalled();
    });

    it('should be disabled depending on readonly', () => {
      const tree = shallow((
        <DateEditor
          {...defaultProps}
          readOnly
        />
      ));

      expect(tree.find(DateTimePicker).at(0).prop('disabled'))
        .toBeTruthy();
    });

    it('should display time correctly', () => {
      const tree = shallow((
        <DateEditor
          {...defaultProps}
        />
      ));

      expect(tree.find(DateTimePicker).at(0).prop('format'))
        .toBe('DD/MM/YYYY hh:mm A');
    });
  });
});

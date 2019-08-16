import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import Grid from '@material-ui/core/Grid';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import Typography from '@material-ui/core/Typography';
import { FULL_DATE_TIME_EDITOR } from '@devexpress/dx-scheduler-core';
import { DateEditor } from './date-editor';

describe('AppointmentForm common', () => {
  const defaultProps = {
    onFirstDateValueChange: jest.fn(),
    onSecondDateValueChange: jest.fn(),
  };
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });

  describe('DateEditor', () => {
    it('should pass rest props to the Grid element', () => {
      const tree = shallow((
        <DateEditor data={{ a: 1 }} />
      ));

      const rootGrid = tree.find(Grid);

      expect(rootGrid.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should render full DateAndTime Editor correctly', () => {
      const classes = getClasses(<DateEditor />);
      const tree = shallow((
        <DateEditor id={FULL_DATE_TIME_EDITOR} />
      ));

      const dateTimePickers = tree.find(KeyboardDateTimePicker);

      expect(dateTimePickers)
        .toHaveLength(2);
      expect(tree.find(Typography))
        .toHaveLength(1);

      expect(dateTimePickers.at(0).is(`.${classes.full}`))
        .toBeTruthy();
      expect(dateTimePickers.at(0).is(`.${classes.dateEditor}`))
        .toBeTruthy();
      expect(dateTimePickers.at(1).is(`.${classes.full}`))
        .toBeTruthy();
      expect(dateTimePickers.at(1).is(`.${classes.dateEditor}`))
        .toBeTruthy();
    });

    it('should render partial DateAndTime Editor correctly', () => {
      const classes = getClasses(<DateEditor />);
      const tree = shallow((
        <DateEditor />
      ));

      const dateTimePickers = tree.find(KeyboardDateTimePicker);

      expect(dateTimePickers)
        .toHaveLength(1);
      expect(tree.find(Typography))
        .toHaveLength(0);

      expect(dateTimePickers.at(0).is(`.${classes.partial}`))
        .toBeTruthy();
      expect(dateTimePickers.at(0).is(`.${classes.dateEditor}`))
        .toBeTruthy();
    });

    it('should handle onChanges correctly', () => {
      const tree = shallow((
        <DateEditor {...defaultProps} id={FULL_DATE_TIME_EDITOR} />
      ));

      const dateTimePickers = tree.find(KeyboardDateTimePicker);

      dateTimePickers.at(0).simulate('change', 'abc');
      expect(defaultProps.onFirstDateValueChange)
        .toBeCalledWith('abc');

      dateTimePickers.at(1).simulate('change', 'abc');
      expect(defaultProps.onSecondDateValueChange)
        .toBeCalledWith('abc');
    });
  });
});

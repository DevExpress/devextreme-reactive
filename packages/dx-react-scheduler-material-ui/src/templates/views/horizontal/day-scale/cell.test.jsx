import * as React from 'react';
import { createShallow, getClasses } from '@mui/material/test-utils';
import { Cell } from './cell';

describe('Horizontal view DayScale', () => {
  const defaultProps = {
    startDate: new Date(2018, 6, 7, 16, 20),
    formatDate: () => undefined,
  };
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<Cell {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });
  describe('Cell', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Cell {...defaultProps} className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.cell}`))
        .toBeTruthy();
      expect(tree.is(`.${classes.brightRightBorder}`))
        .toBeFalsy();
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Cell {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
    it('should call formatDate function', () => {
      const formatDate = jest.fn();
      formatDate.mockImplementation(() => 'time');
      const tree = shallow((
        <Cell {...defaultProps} formatDate={formatDate} />
      ));

      expect(formatDate)
        .toHaveBeenCalledWith(defaultProps.startDate, { weekday: 'short' });
      expect(tree.find(`.${classes.dayOfWeek}`).props().children)
        .toBeTruthy();
    });
    it('should render a cell with a bright border', () => {
      const tree = shallow((
        <Cell {...defaultProps} endOfGroup />
      ));

      expect(tree.is(`.${classes.brightRightBorder}`))
        .toBeTruthy();
    });
  });
});

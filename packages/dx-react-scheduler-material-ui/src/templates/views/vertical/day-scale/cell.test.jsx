import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Cell } from './cell';

describe('Vertical view DayPanel', () => {
  const defaultProps = {
    startDate: new Date(2018, 6, 7, 16, 20),
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
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Cell {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
    it('should highlight today cell', () => {
      const tree = shallow((
        <Cell {...defaultProps} today />
      ));

      expect(tree.find(`p.${classes.highlightCell}`).exists())
        .toBeTruthy();
      expect(tree.find(`span.${classes.highlightCell}`).exists())
        .toBeTruthy();
    });
    it('should call dateFormat function', () => {
      const dateFormat = jest.fn();
      shallow((
        <Cell {...defaultProps} dateFormat={dateFormat} />
      ));

      expect(dateFormat)
        .toHaveBeenCalledWith(defaultProps.startDate, { weekday: 'short' });
      expect(dateFormat)
        .toHaveBeenCalledWith(defaultProps.startDate, { day: 'numeric' });
    });
  });
});

import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Cell } from './cell';

describe('Horizontal view TimeTable', () => {
  const defaultProps = {
    startDate: new Date(2018, 6, 7, 16),
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
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Cell {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
    it('should have tabIndex 0', () => {
      const tree = shallow((
        <Cell {...defaultProps} />
      ));

      expect(tree.props().tabIndex)
        .toBe(0);
    });
    it('should highlight a "today" cell', () => {
      const tree = shallow((
        <Cell {...defaultProps} today />
      ));

      expect(tree.find(`.${classes.today}`))
        .toHaveLength(1);
    });
    it('should not highlight a commont cell', () => {
      const tree = shallow((
        <Cell {...defaultProps} />
      ));

      expect(tree.find(`.${classes.today}`))
        .toHaveLength(0);
      expect(tree.find(`.${classes.text}`))
        .toHaveLength(1);
    });
  });
  it('should highlight cells from an other month', () => {
    const tree = shallow((
      <Cell {...defaultProps} otherMonth />
    ));

    expect(tree.find(`.${classes.otherMonth}`))
      .toHaveLength(1);
  });
  it('should call date format function', () => {
    const formatDate = jest.fn();
    formatDate.mockImplementation(() => 'time');
    const tree = shallow((
      <Cell {...defaultProps} formatDate={formatDate} />
    ));

    expect(formatDate)
      .toHaveBeenCalledWith(defaultProps.startDate, { day: 'numeric' });
    expect(tree.find(`.${classes.text}`).props().children)
      .toBeTruthy();
  });
  it('should call date format function with month and day parameter', () => {
    const formatDate = jest.fn();
    formatDate.mockImplementation(() => 'time');
    const startDate = new Date(2018, 6, 1, 16);
    const tree = shallow((
      <Cell formatDate={formatDate} startDate={startDate} />
    ));

    expect(formatDate)
      .toHaveBeenCalledWith(startDate, { day: 'numeric', month: 'short' });
    expect(tree.find(`.${classes.text}`).props().children)
      .toBeTruthy();
  });
});

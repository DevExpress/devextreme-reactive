import * as React from 'react';
import { createShallow, getClasses } from '@devexpress/dx-testing';
import { VERTICAL_GROUP_ORIENTATION } from '@devexpress/dx-scheduler-core';
import { Cell } from './cell';

describe('Horizontal view TimeTable', () => {
  const defaultProps = {
    startDate: new Date(2018, 6, 7, 16),
    formatDate: jest.fn(),
  };
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<Cell {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });
  beforeEach(() => {
    defaultProps.formatDate.mockImplementation(() => 'time');
  });
  afterEach(() => {
    jest.clearAllMocks();
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
      expect(tree.is(`.${classes.shadedCell}`))
        .toBeFalsy();
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
    it('should not highlight a common cell', () => {
      const tree = shallow((
        <Cell {...defaultProps} />
      ));

      expect(tree.find(`.${classes.today}`))
        .toHaveLength(0);
      expect(tree.find(`.${classes.text}`))
        .toHaveLength(1);
      expect(tree.is(`.${classes.brightRightBorder}`))
        .toBeFalsy();
    });
  });
  it('should highlight cells from another month', () => {
    const tree = shallow((
      <Cell {...defaultProps} otherMonth />
    ));

    expect(tree.find(`.${classes.otherMonth}`))
      .toHaveLength(1);
  });
  it('should call date format function', () => {
    const tree = shallow((
      <Cell {...defaultProps} />
    ));

    expect(defaultProps.formatDate)
      .toHaveBeenCalledWith(defaultProps.startDate, { day: 'numeric' });
    expect(tree.find(`.${classes.text}`).props().children)
      .toBeTruthy();
  });
  it('should call date format function with month and day parameter', () => {
    const startDate = new Date(2018, 6, 1, 16);
    const tree = shallow((
      <Cell {...defaultProps} startDate={startDate} />
    ));

    expect(defaultProps.formatDate)
      .toHaveBeenCalledWith(startDate, { day: 'numeric', month: 'short' });
    expect(tree.find(`.${classes.text}`).props().children)
      .toBeTruthy();
  });
  it('shouldn\'t call date format function with month and day parameter if it is the beginning of the month and the today\'s date', () => {
    const startDate = new Date(2018, 6, 1, 16);
    shallow((
      <Cell {...defaultProps} startDate={startDate} today />
    ));

    expect(defaultProps.formatDate)
      .toHaveBeenCalledWith(startDate, { day: 'numeric' });
  });
  it('should be shaded if isShaded is true', () => {
    const tree = shallow((
      <Cell {...defaultProps} isShaded />
    ));

    expect(tree.is(`.${classes.shadedCell}`))
      .toBeTruthy();
  });
  it('should render the last cell in a horizontal group', () => {
    const tree = shallow((
      <Cell {...defaultProps} endOfGroup />
    ));

    expect(tree.is(`.${classes.brightRightBorder}`))
      .toBeTruthy();
    expect(tree.is(`.${classes.brightBorderBottom}`))
      .toBeFalsy();
  });
  it('should render the last cell in a vertical group', () => {
    const tree = shallow((
      <Cell
        {...defaultProps}
        endOfGroup
        groupOrientation={VERTICAL_GROUP_ORIENTATION}
      />
    ));

    expect(tree.is(`.${classes.brightBorderBottom}`))
      .toBeTruthy();
    expect(tree.is(`.${classes.brightRightBorder}`))
      .toBeFalsy();
  });
});

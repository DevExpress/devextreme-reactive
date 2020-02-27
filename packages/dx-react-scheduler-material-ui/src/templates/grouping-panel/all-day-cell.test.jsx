import * as React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { VERTICAL_GROUP_ORIENTATION } from '@devexpress/dx-scheduler-core';
import { AllDayCell } from './all-day-cell';

jest.mock('@material-ui/core/styles', () => ({
  ...require.requireActual('@material-ui/core/styles'),
  makeStyles: jest.fn(() => () => ({
    cell: 'cell',
  })),
}));

describe('GroupingPanel', () => {
  const defaultProps = {
    group: {},
    rowSpan: 7,
    height: 35,
    timeTableCellHeight: 48,
  };
  let shallow;
  beforeAll(() => {
    shallow = createShallow();
  });
  describe('AllDay Panel Cell', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <AllDayCell {...defaultProps} className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is('.cell'))
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <AllDayCell {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should pass correct props to the root element', () => {
      const tree = shallow((
        <AllDayCell {...defaultProps} />
      ));

      expect(tree.props().group)
        .toBe(defaultProps.group);
      expect(tree.props().colSpan)
        .toBe(1);
      expect(tree.props().rowSpan)
        .toBe(defaultProps.rowSpan);
      expect(tree.props().height)
        .toBe(defaultProps.height);
      expect(tree.props().timeTableCellHeight)
        .toBe(defaultProps.timeTableCellHeight);
      expect(tree.props().groupOrientation)
        .toBe(VERTICAL_GROUP_ORIENTATION);
      expect(tree.props().left)
        .toBe(0);
      expect(tree.props().textStyle)
        .toEqual(expect.any(Object));
    });
  });
});

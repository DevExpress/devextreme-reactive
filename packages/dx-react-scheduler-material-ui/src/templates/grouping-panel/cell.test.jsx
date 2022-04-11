import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import { HORIZONTAL_GROUP_ORIENTATION, VERTICAL_GROUP_ORIENTATION } from '@devexpress/dx-scheduler-core';
import { Cell, classes } from './cell';

describe('GroupingPanel', () => {
  const defaultProps = {
    group: {},
    colSpan: 1,
    left: 0,
  };
  let shallow;
  beforeAll(() => {
    shallow = createShallow();
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

    it('should render text item', () => {
      const tree = shallow((
        <Cell {...defaultProps} />
      ));

      expect(tree.find('.text'))
        .toBeTruthy();
    });

    it('should render horizontal cell', () => {
      const tree = shallow((
        <Cell
          {...defaultProps}
          groupOrientation={HORIZONTAL_GROUP_ORIENTATION}
          groupedByDate={false}
        />
      ));

      expect(tree.is(`.${classes.horizontalCell}`))
        .toBeTruthy();
      expect(tree.is('.verticalCell'))
        .toBeFalsy();
      expect(tree.is('.groupedByDate'))
        .toBeFalsy();
      expect(tree.find('.verticalCellText').exists())
        .toBeFalsy();
    });

    it('should render vertical cell', () => {
      const tree = shallow((
        <Cell
          {...defaultProps}
          groupOrientation={VERTICAL_GROUP_ORIENTATION}
        />
      ));

      expect(tree.is('.horizontalCell'))
        .toBeFalsy();
      expect(tree.is(`.${classes.verticalCell}`))
        .toBeTruthy();
      expect(tree.is('.groupedByDate'))
        .toBeFalsy();
      expect(tree.find(`.${classes.verticalCellText}`).exists())
        .toBeTruthy();
    });

    it('should render grouped by date cell', () => {
      const tree = shallow((
        <Cell {...defaultProps} groupedByDate />
      ));

      expect(tree.is(`.${classes.horizontalCell}`))
        .toBeTruthy();
      expect(tree.is('.verticalCell'))
        .toBeFalsy();
      expect(tree.is(`.${classes.groupedByDate}`))
        .toBeTruthy();
      expect(tree.find('.verticalCellText').exists())
        .toBeFalsy();
    });

    it('should pass colSpan and rowSpan to the root element', () => {
      const tree = shallow((
        <Cell
          {...defaultProps}
          colSpan="colSpan"
          rowSpan="rowSpan"
        />
      ));

      expect(tree.prop('colSpan'))
        .toBe('colSpan');
      expect(tree.prop('rowSpan'))
        .toBe('rowSpan');
    });

    it('should assign text container class when vertical grouping is used', () => {
      const tree = shallow((
        <Cell
          {...defaultProps}
          groupOrientation={VERTICAL_GROUP_ORIENTATION}
        />
      ));

      expect(tree.find(`.${classes.textContainer}`).exists())
        .toBe(true);
    });

    it('should not assign textContainer class if horizontal grouping is used', () => {
      const tree = shallow((
        <Cell
          {...defaultProps}
          groupOrientation={HORIZONTAL_GROUP_ORIENTATION}
        />
      ));

      expect(tree.find('.textContainer').exists())
        .toBe(false);
    });
  });
});

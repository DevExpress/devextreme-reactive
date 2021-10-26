import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import { VERTICAL_GROUP_ORIENTATION } from '@devexpress/dx-scheduler-core';
import { Cell, classes } from './cell';

describe('AllDayPanel', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });
  describe('Cell', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Cell className="custom-class" />
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
        <Cell data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
    it('should render a cell with a bright border', () => {
      const tree = shallow((
        <Cell endOfGroup />
      ));

      expect(tree.is(`.${classes.brightRightBorder}`))
        .toBeTruthy();
    });
    it('should not render a cell with a bright border when vertical grouping is used', () => {
      const tree = shallow((
        <Cell endOfGroup groupOrientation={VERTICAL_GROUP_ORIENTATION} />
      ));

      expect(tree.is(`.${classes.brightRightBorder}`))
        .toBeFalsy();
    });
  });
});

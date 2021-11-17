import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import { TickCell, classes } from './tick-cell';

describe('Vertical view TimeScale', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });
  describe('TickCell', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <TickCell className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.cell}`))
        .toBeTruthy();
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <TickCell data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
    it('should render label with bright borderBottom if it is the last in group', () => {
      const tree = shallow((
        <TickCell endOfGroup />
      ));

      expect(tree.is(`.${classes.brightBottomBorder}`))
        .toBeTruthy();
    });
    it('should render all-day tick cell', () => {
      const tree = shallow((
        <TickCell isAllDay />
      ));

      expect(tree.is(`.${classes.allDayCell}`))
        .toBeTruthy();
    });
  });
});

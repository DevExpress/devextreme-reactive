import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import { Cell, classes } from './cell';

describe('Calendar', () => {
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
    });
    it('should render the selected cell', () => {
      const span = shallow((
        <Cell selected />
      )).find('span');

      expect(span.is(`.${classes.selected}`))
        .toBeTruthy();
    });
    it('should render the today cell', () => {
      const span = shallow((
        <Cell today />
      )).find('span');

      expect(span.is(`.${classes.today}`))
        .toBeTruthy();
    });
    it('should prefer the selected prop', () => {
      const span = shallow((
        <Cell today selected />
      )).find('span');

      expect(span.is(`.${classes.selected}`))
        .toBeTruthy();
    });
    it('should render a cell from other month', () => {
      const cell = shallow((
        <Cell otherMonth />
      ));

      expect(cell.is(`.${classes.otherMonth}`))
        .toBeTruthy();
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Cell data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
  });
});

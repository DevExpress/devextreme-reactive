import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Table } from './table';

describe('DayPanel', () => {
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<Table><div /></Table>);
    shallow = createShallow({ dive: true });
  });
  describe('Table', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Table className="custom-class">
          <div />
        </Table>
      ));

      expect(tree.find('.custom-class'))
        .toBeTruthy();
      expect(tree.find(`.${classes.table}`))
        .toBeTruthy();
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Table data={{ a: 1 }}>
          <div />
        </Table>
      ));

      expect(tree.find(`.${classes.table}`).props().data)
        .toMatchObject({ a: 1 });
    });
  });
});

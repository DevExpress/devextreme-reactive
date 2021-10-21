import * as React from 'react';
import { createShallow, getClasses } from '@devexpress/dx-testing';
import { HeaderCell } from './header-cell';

describe('Calendar', () => {
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<HeaderCell />);
    shallow = createShallow({ dive: true });
  });
  describe('Header Cell', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <HeaderCell className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.cell}`))
        .toBeTruthy();
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <HeaderCell data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
  });
});

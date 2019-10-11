import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { TickCell } from './tick-cell';

describe('Vertical view TimeScale', () => {
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<TickCell />);
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
  });
});

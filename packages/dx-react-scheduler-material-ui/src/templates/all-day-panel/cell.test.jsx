import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Cell } from './cell';

describe('AllDayPanel', () => {
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<Cell />);
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
  });
});

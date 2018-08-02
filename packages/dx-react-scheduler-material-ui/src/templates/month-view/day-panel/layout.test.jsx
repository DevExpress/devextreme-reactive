import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Layout } from './layout';

describe('Month View DayPanel', () => {
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<Layout />);
    shallow = createShallow({ dive: true });
  });
  describe('Layout', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Layout className="custom-class" />
      ));

      expect(tree.find('.custom-class'))
        .toBeTruthy();
      expect(tree.find(`.${classes.table}`))
        .toBeTruthy();
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Layout data={{ a: 1 }} />
      ));

      expect(tree.find(`.${classes.table}`).props().data)
        .toMatchObject({ a: 1 });
    });
    it('should render array of days', () => {
      const cell = () => <td />;
      const dayScale = [new Date('2018-07-26'), new Date('2018-07-26')];
      const tree = shallow((
        <Layout dayScale={dayScale} cellComponent={cell} />
      ));

      expect(tree.find(cell))
        .toHaveLength(2);
    });
  });
});

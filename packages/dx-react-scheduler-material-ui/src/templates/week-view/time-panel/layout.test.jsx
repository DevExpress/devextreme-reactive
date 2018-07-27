import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Layout } from './layout';

describe('Week View TimePanel', () => {
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
      /* eslint-disable-next-line */
      const row = ({ children }) => <tr>{children}</tr>;
      const timeScale = [{ start: 1 }, { start: 2 }, { start: 3 }, { start: 4 }];
      const tree = shallow((
        <Layout
          timeScale={timeScale}
          cellComponent={cell}
          rowComponent={row}
        />
      ));

      expect(tree.find(cell))
        .toHaveLength(2);
      expect(tree.find(row))
        .toHaveLength(4);
    });
  });
});

import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Layout } from './layout';

describe('Month View DateTable', () => {
  const defaultProps = {
    dateTableRef: () => undefined,
    monthCells: [],
  };
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<Layout {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });
  describe('Layout', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Layout {...defaultProps} className="custom-class" />
      ));

      expect(tree.find('.custom-class'))
        .toBeTruthy();
      expect(tree.find(`.${classes.table}`))
        .toBeTruthy();
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Layout {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.find(`.${classes.table}`).props().data)
        .toMatchObject({ a: 1 });
    });
    it('should render array of days', () => {
      const cell = () => <td />;
      /* eslint-disable-next-line */
      const row = ({ children }) => <tr>{children}</tr>;
      const monthCells = [
        [{ value: 1 }, { value: 2 }],
        [{ value: 3 }, { value: 4 }],
      ];
      const tree = shallow((
        <Layout {...defaultProps} monthCells={monthCells} cellComponent={cell} rowComponent={row} />
      ));

      expect(tree.find(cell))
        .toHaveLength(4);
      expect(tree.find(row))
        .toHaveLength(2);
    });
  });
});

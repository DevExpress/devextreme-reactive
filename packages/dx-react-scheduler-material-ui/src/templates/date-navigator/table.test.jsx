import * as React from 'react';
import { createShallow, createMount, getClasses } from '@material-ui/core/test-utils';
import { Table } from './table';

describe('DateNavigator', () => {
  const defaultProps = {
    rowComponent: () => null,
    cellComponent: () => null,
    cells: [],
  };
  let classes;
  let shallow;
  let mount;
  beforeAll(() => {
    classes = getClasses(<Table {...defaultProps} />);
    shallow = createShallow({ dive: true });
    mount = createMount();
  });
  describe('Table', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Table {...defaultProps} className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.table}`))
        .toBeTruthy();
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Table {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
    it('should render cell and rows by props', () => {
      const props = {
        // eslint-disable-next-line react/prop-types
        rowComponent: ({ children }) => (
          <tr>
            {children}
          </tr>
        ),
        cellComponent: () => <td />,
        cells: [
          [
            { value: 1, isOtherMonth: 1, isCurrent: 1 },
            { value: 2, isOtherMonth: 1, isCurrent: 1 },
          ],
          [
            { value: 3, isOtherMonth: 1, isCurrent: 1 },
            { value: 4, isOtherMonth: 1, isCurrent: 1 },
          ],
        ],
      };
      const tree = mount((
        <Table {...props} />
      ));

      expect(tree.find('tr'))
        .toHaveLength(2);
      expect(tree.find('td'))
        .toHaveLength(4);
    });
  });
});

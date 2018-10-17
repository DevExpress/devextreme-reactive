import * as React from 'react';
import { createShallow, createMount, getClasses } from '@material-ui/core/test-utils';
import { Table } from './table';

describe('Calendar', () => {
  const defaultProps = {
    // eslint-disable-next-line react/prop-types
    rowComponent: ({ children }) => (
      <tr className="table-row">
        {children}
      </tr>
    ),
    // eslint-disable-next-line react/prop-types
    headerRowComponent: ({ children }) => (
      <tr className="header-row">
        {children}
      </tr>
    ),
    cellComponent: () => <td />,
    headerCellComponent: () => <th className="header-cell" />,
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
    it('should render cell and rows by the "cells" props', () => {
      const cells = [
        [{ startDate: 1, isOtherMonth: true }, { startDate: 2 }],
        [{ startDate: 3 }, { startDate: 4, isCurrent: true }],
      ];
      const tree = mount((
        <Table
          {...defaultProps}
          cells={cells}
        />
      ));
      const cellComponents = tree.find(defaultProps.cellComponent);
      expect(tree.find('.table-row'))
        .toHaveLength(2);
      expect(cellComponents)
        .toHaveLength(4);
      expect(cellComponents.first().props().otherMonth)
        .toBeTruthy();
      expect(cellComponents.last().props().current)
        .toBeTruthy();
    });

    it('should render header cell and rows by the "headerCells" props', () => {
      const tree = mount((
        <Table
          {...defaultProps}
          headerCells={['2018-07-12', '2018-07-13']}
        />
      ));

      expect(tree.find('.header-row'))
        .toHaveLength(1);
      expect(tree.find('.header-cell'))
        .toHaveLength(2);
    });

    it('should handle the "onCellClick" event', () => {
      const cellClickMock = jest.fn();
      const tree = mount((
        <Table
          {...defaultProps}
          cells={[[{ startDate: '2018-07-16' }]]}
          onCellClick={cellClickMock}
        />
      ));

      tree.find(defaultProps.cellComponent).props().onClick();

      expect(cellClickMock)
        .toBeCalledWith({ nextDate: '2018-07-16' });
    });
  });
});

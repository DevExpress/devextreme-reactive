import * as React from 'react';
import { createShallow, createMount } from '@devexpress/dx-testing';
import { Table, classes } from './table';

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
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    headerCellComponent: () => <th className="header-cell" />,
    cells: [],
    formatDate: key => key,
  };
  let shallow;
  let mount;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });
  beforeEach(() => {
    mount = createMount();
  });
  afterEach(() => {
    mount.cleanUp();
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
        [{ startDate: 1, otherMonth: true }, { startDate: 2 }],
        [{ startDate: 3 }, { startDate: 4, today: true }],
      ];
      const tree = mount((
        <Table
          {...defaultProps}
          selectedDate={4}
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
      expect(cellComponents.last().props().today)
        .toBeTruthy();
      expect(cellComponents.last().props().selected)
        .toBeTruthy();
    });

    it('should render header cell and rows by the "headerCells" props', () => {
      const tree = mount((
        <Table
          {...defaultProps}
          headerCells={[{ startDate: '2018-07-12' }, { startDate: '2018-07-13' }]}
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
        .toBeCalledWith('2018-07-16');
    });
  });
});

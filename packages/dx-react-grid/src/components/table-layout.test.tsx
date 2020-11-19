/* globals window:true */

import * as React from 'react';
import { shallow, mount } from 'enzyme';
// tslint:disable-next-line: import-name
import Immutable from 'seamless-immutable';
import {
  getAnimations,
  filterActiveAnimations,
  evalAnimations,
} from '@devexpress/dx-grid-core';
import { setupConsole } from '@devexpress/dx-testing';
import { TableLayout } from './table-layout';

jest.mock('@devexpress/dx-grid-core', () => ({
  TABLE_FLEX_TYPE: 'flex',
  getAnimations: jest.fn(),
  filterActiveAnimations: jest.fn(),
  evalAnimations: jest.fn(),
  getTableColumnGeometries: jest.fn(() => []),
}));

const getDOMNode = jest.fn(() => ({
  scrollWidth: 300,
  offsetWidth: 200,
}));

const defaultProps = {
  layoutComponent: () => null,
};

describe('TableLayout', () => {
  let resetConsole;
  beforeEach(() => {
    resetConsole = setupConsole();
  });

  afterEach(() => {
    resetConsole();
    jest.clearAllMocks();
  });

  describe('flex column', () => {
    it('should add flex column if all columns have fixed widths', () => {
      const columns = [
        { key: 'a', column: { name: 'a' }, width: 100 },
        { key: 'b', column: { name: 'b' }, width: '50' },
      ];

      const tree = shallow((
        <TableLayout
          {...defaultProps}
          columns={columns}
          minColumnWidth={100}
        />
      ));

      expect(tree.find(defaultProps.layoutComponent).props())
        .toMatchObject({
          minWidth: '100px + 50px',
          columns: [
            ...columns,
            { key: 'flex', type: 'flex' },
          ],
        });
    });
  });

  describe('animation', () => {
    let originalRaf;
    let rafCallback = () => {};

    beforeEach(() => {
      originalRaf = window.requestAnimationFrame;
      window.requestAnimationFrame = jest.fn((callback) => { rafCallback = callback; });
    });
    afterEach(() => {
      window.requestAnimationFrame = originalRaf;
    });

    const layoutComponent = ({ tableRef }) => {
      // eslint-disable-next-line no-param-reassign, react/no-find-dom-node
      tableRef.current = getDOMNode();
      return null;
    };
    const columns = [
      { key: 'a', column: { name: 'a' }, width: 100 },
      { key: 'b', column: { name: 'b' } },
    ];
    const animationDefaultProps = {
      ...defaultProps,
      columns,
      layoutComponent,
      minColumnWidth: 100,
    };

    it('should not be updated if columns were not changed', () => {
      const tree = mount((
        <TableLayout
          {...animationDefaultProps}
        />
      ));

      tree.setProps({ columns: columns.slice() });
      rafCallback();
      tree.setProps({ columns: columns.slice() });
      tree.update();
      rafCallback();

      expect(getAnimations).not.toBeCalled();
    });

    it('should be updated if an active animation is in progress', () => {
      filterActiveAnimations.mockImplementation(() => new Map([['col', {}]]));
      getAnimations.mockImplementation(() => new Map([['col', {}]]));
      evalAnimations.mockImplementation(() => new Map());
      const nextColumns = [columns[1], columns[0]];
      const tree = mount((
        <TableLayout
          {...animationDefaultProps}
        />
      ));

      tree.setProps({ columns: nextColumns });
      rafCallback();
      getAnimations.mockClear();

      tree.setProps({ columns: nextColumns.slice() });
      tree.update();
      rafCallback();

      expect(getAnimations).toBeCalled();
    });

    it('should be updated on the "columns" property change', () => {
      filterActiveAnimations.mockImplementation(() => new Map());
      evalAnimations.mockImplementation(() => new Map());

      const nextColumns = [columns[1], columns[0]];

      const tree = mount((
        <TableLayout
          {...animationDefaultProps}
        />
      ));
      tree.setProps({ columns: nextColumns });
      rafCallback();

      expect(getAnimations)
        .toHaveBeenCalledTimes(1);
      expect(getAnimations)
        .toHaveBeenCalledWith(columns, nextColumns, 300, new Map());
    });

    it('should start on the "columns" property change', () => {
      const nextColumns = [columns[1], columns[0]];
      const animations = new Map([
        ['a', { left: { from: 200, to: 0 } }],
        ['b', { left: { from: 0, to: 100 } }],
      ]);

      filterActiveAnimations.mockImplementation(() => animations);

      const tree = mount((
        <TableLayout
          {...animationDefaultProps}
        />
      ));
      tree.setProps({ columns: nextColumns });
      rafCallback();

      expect(filterActiveAnimations)
        .toHaveBeenCalledTimes(1);
      expect(evalAnimations)
        .toHaveBeenCalledTimes(1);
      expect(evalAnimations)
        .toHaveBeenCalledWith(animations);
    });

    describe('cache table width', () => {
      const nextColumnsWithSize = width => ([
        columns[0],
        { ...columns[1], width },
      ]);
      const tableDimensions = { scrollWidth: 300, offsetWidth: 200 };

      it('should not reset width if scroll width changed', () => {
        const tree = mount((
          <TableLayout
            {...animationDefaultProps}
          />
        ));
        getDOMNode
          .mockReturnValueOnce(tableDimensions)
          .mockReturnValueOnce({ ...tableDimensions, scrollWidth: 400 })
          .mockReturnValue(tableDimensions);
        filterActiveAnimations.mockImplementation(() => new Map());

        tree.setProps({ columns: nextColumnsWithSize(200) });
        rafCallback();
        tree.setProps({ columns: nextColumnsWithSize(100) });
        tree.update();
        rafCallback();

        expect(getAnimations).toHaveBeenCalledTimes(2);
        expect(getAnimations)
          .toHaveBeenLastCalledWith(expect.anything(), expect.anything(), 300, new Map());
      });

      it('should reset width if offset width changed', () => {
        const tree = mount((
          <TableLayout
            {...animationDefaultProps}
          />
        ));
        getDOMNode
          .mockReturnValueOnce(tableDimensions)
          .mockReturnValueOnce({ scrollWidth: 400, offsetWidth: 300 })
          .mockReturnValue(tableDimensions);
        filterActiveAnimations.mockImplementation(() => new Map());

        tree.setProps({ columns: nextColumnsWithSize(200) });
        rafCallback();
        tree.setProps({ columns: nextColumnsWithSize(100) });
        rafCallback();

        expect(getAnimations).toHaveBeenCalledTimes(2);
        expect(getAnimations)
          .toHaveBeenLastCalledWith(expect.anything(), expect.anything(), 400, new Map());
      });

      it('should reset width if column count changed', () => {
        const tree = mount((
          <TableLayout
            {...animationDefaultProps}
          />
        ));
        getDOMNode
          .mockReturnValueOnce(tableDimensions)
          .mockReturnValueOnce({ scrollWidth: 400, offsetWidth: 200 })
          .mockReturnValue(tableDimensions);
        filterActiveAnimations.mockImplementation(() => new Map());

        tree.setProps({ columns: nextColumnsWithSize(200) });
        rafCallback();
        tree.setProps({ columns: columns.slice(1) });
        rafCallback();

        expect(getAnimations).toHaveBeenCalledTimes(2);
        expect(getAnimations)
          .toHaveBeenLastCalledWith(expect.anything(), expect.anything(), 400, new Map());
      });

      it('should not reset width if animations not finished', () => {
        const tree = mount((
          <TableLayout
            {...animationDefaultProps}
          />
        ));
        getDOMNode
          .mockReturnValueOnce(tableDimensions)
          .mockReturnValueOnce({ scrollWidth: 400, offsetWidth: 200 })
          .mockReturnValue(tableDimensions);
        filterActiveAnimations.mockImplementation(() => new Map());

        tree.setProps({ columns: nextColumnsWithSize(200) });
        rafCallback();
        tree.setProps({ columns: columns.slice(0, 1) });
        rafCallback();

        expect(getAnimations).toHaveBeenCalledTimes(2);
        expect(getAnimations)
          .toHaveBeenLastCalledWith(expect.anything(), expect.anything(), 400, new Map());
      });

      it('should work with immutable properties', () => {
        const immutableColumns = Immutable([
          { key: 'a', column: { name: 'a' }, width: 100 },
          { key: 'b', column: { name: 'b' }, width: 100 },
        ]);
        expect(() => mount((
          <TableLayout
            {...animationDefaultProps}
            columns={immutableColumns}
          />
        ))).not.toThrow();
      });
    });
  });
});

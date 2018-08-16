/* globals window:true */

import * as React from 'react';
import { shallow } from 'enzyme';
import {
  getAnimations,
  filterActiveAnimations,
  evalAnimations,
} from '@devexpress/dx-grid-core';
import { setupConsole } from '@devexpress/dx-testing';
import { TableLayout } from './table-layout';

jest.mock('react-dom', () => ({
  findDOMNode: jest.fn(() => ({
    scrollWidth: 300,
  })),
}));
jest.mock('@devexpress/dx-grid-core', () => ({
  getAnimations: jest.fn(),
  filterActiveAnimations: jest.fn(),
  evalAnimations: jest.fn(),
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
        { key: 'b', column: { name: 'b' }, width: 100 },
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
          minWidth: 200,
          columns: [
            ...columns,
            { key: 'flex', type: 'flex' },
          ],
        });
    });
  });

  describe('animation', () => {
    let originalRaf;

    beforeEach(() => {
      originalRaf = window.requestAnimationFrame;
      window.requestAnimationFrame = jest.fn();
    });
    afterEach(() => {
      window.requestAnimationFrame = originalRaf;
    });

    it('should be updated on the "columns" property change', () => {
      filterActiveAnimations.mockImplementation(() => new Map());
      evalAnimations.mockImplementation(() => new Map());

      const columns = [
        { key: 'a', column: { name: 'a' }, width: 100 },
        { key: 'b', column: { name: 'b' } },
      ];
      const nextColumns = [columns[1], columns[0]];

      const tree = shallow((
        <TableLayout
          {...defaultProps}
          columns={columns}
          minColumnWidth={100}
        />
      ));
      tree.setProps({ columns: nextColumns });

      expect(getAnimations)
        .toHaveBeenCalledTimes(1);
      expect(getAnimations)
        .toHaveBeenCalledWith(columns, nextColumns, 300, new Map());
    });

    it('should start on the "columns" property change', () => {
      const columns = [
        { key: 'a', column: { name: 'a' }, width: 100 },
        { key: 'b', column: { name: 'b' } },
      ];
      const nextColumns = [columns[1], columns[0]];
      const animations = new Map([
        ['a', { left: { from: 200, to: 0 } }],
        ['b', { left: { from: 0, to: 100 } }],
      ]);

      filterActiveAnimations.mockImplementation(() => animations);

      const tree = shallow((
        <TableLayout
          {...defaultProps}
          columns={columns}
          minColumnWidth={100}
        />
      ));
      tree.setProps({ columns: nextColumns });

      expect(filterActiveAnimations)
        .toHaveBeenCalledTimes(1);
      expect(evalAnimations)
        .toHaveBeenCalledTimes(1);
      expect(evalAnimations)
        .toHaveBeenCalledWith(animations);
    });

    it('should not start if the "columns" property length is changed', () => {
      filterActiveAnimations.mockImplementation(() => new Map());

      const columns = [
        { key: 'a', column: { name: 'a' }, width: 100 },
        { key: 'b', column: { name: 'b' } },
      ];
      const nextColumns = [columns[1]];

      const tree = shallow((
        <TableLayout
          {...defaultProps}
          columns={columns}
          minColumnWidth={100}
        />
      ));
      tree.setProps({ columns: nextColumns });

      expect(getAnimations)
        .not.toHaveBeenCalled();
    });
  });
});

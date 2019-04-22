import * as React from 'react';
import {
  recalculateBounds, calculateRequestedRange,
  virtualRowsWithCache, trimRowsToInterval,
  emptyVirtualRows,
  plainRows,
  loadedRowsStart,
} from '@devexpress/dx-grid-core';
import { PluginHost } from '@devexpress/dx-react-core';
import { mount } from 'enzyme';
import {
  pluginDepsToComponents, getComputedState, executeComputedAction,
} from '@devexpress/dx-testing';
import { VirtualTableState } from './virtual-table-state';

jest.mock('@devexpress/dx-grid-core', () => ({
  ...require.requireActual('@devexpress/dx-grid-core'),
  virtualRowsWithCache: jest.fn(),
  plainRows: jest.fn(),
  loadedRowsStart: jest.fn(),
}));

const defaultDeps = {
  getter: {
    rows: [{ id: 1 }],
    getRowId: row => row.id,
  },
};

const defaultProps = {
  skip: 100,
  totalRowCount: 1000,
  getRows: () => {},
};

describe('VirtualTableState', () => {
  beforeEach(() => {
    virtualRowsWithCache.mockImplementation(() => 'virtualRowsWithCache');
    plainRows.mockImplementation(() => 'plainRows');
    loadedRowsStart.mockImplementation(() => 'loadedRowsStart');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getters', () => {
    it('should provide value from "skip" property', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <VirtualTableState
            {...defaultProps}
            skip={200}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).skip)
        .toBe(200);
    });

    it('should provide value from "totalRowCount" property', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <VirtualTableState
            {...defaultProps}
            totalRowCount={2000}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).availableRowCount)
        .toBe(2000);
    });

    it('should provide cached rows', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <VirtualTableState
            {...defaultProps}
          />
        </PluginHost>
      ));
      tree.find(VirtualTableState).setState({ virtualRowsCache: 'virtualRowsCache' });
      tree.update();

      expect(getComputedState(tree).virtualRowsCache)
        .toBe('virtualRowsCache');
    });

    it('should provide rows merged with cached rows', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <VirtualTableState
            {...defaultProps}
          />
        </PluginHost>
      ));
      tree.find(VirtualTableState).setState({ virtualRowsCache: 'virtualRowsCache' });

      expect(getComputedState(tree).virtualRows)
        .toBe('virtualRowsWithCache');
      expect(virtualRowsWithCache)
        .toBeCalledWith(
          defaultProps.skip,
          defaultDeps.getter.rows,
          'virtualRowsCache',
        );
    });

    it('should provide data rows as plain array', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <VirtualTableState
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).rows)
        .toBe('plainRows');
      expect(plainRows)
        .toBeCalledWith('virtualRowsWithCache');
    });

    it('should provide loaded rows start index', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <VirtualTableState
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).loadedRowsStart)
        .toBe('loadedRowsStart');
      expect(plainRows)
        .toBeCalledWith('virtualRowsWithCache');
    });

    describe('Reload rows', () => {
      beforeEach(() => {
        jest.useFakeTimers();
        virtualRowsWithCache.mockImplementation(() => ({
          skip: 100,
          rows: Array.from({ length: 200 }),
        }));
      });

      it('should reload rows when sorting changed', () => {
        const getRows = jest.fn();
        const tree = mount((
          <PluginHost>
            {pluginDepsToComponents(defaultDeps)}
            <VirtualTableState
              {...defaultProps}
              getRows={getRows}
            />
          </PluginHost>
        ));

        executeComputedAction(tree, actions => actions.changeColumnSorting({}));
        jest.runAllTimers();

        expect(getRows).toHaveBeenCalledTimes(2);
        expect(getRows)
          .toHaveBeenCalledWith(100, 200); // reload visible range
      });

      it('should reload rows when filters changed', () => {
        const getRows = jest.fn();
        const tree = mount((
          <PluginHost>
            {pluginDepsToComponents(defaultDeps)}
            <VirtualTableState
              {...defaultProps}
              getRows={getRows}
            />
          </PluginHost>
        ));

        executeComputedAction(tree, actions => actions.changeColumnFilter({}));
        jest.runAllTimers();

        expect(getRows).toHaveBeenCalledTimes(2);
        expect(getRows)
          .toHaveBeenCalledWith(100, 200); // reload visible range
      });
    });
  });
});

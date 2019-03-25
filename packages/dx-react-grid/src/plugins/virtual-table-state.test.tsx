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
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { VirtualTableState } from './virtual-table-state';

jest.mock('@devexpress/dx-grid-core', () => ({
  virtualRowsWithCache: jest.fn(),
  plainRows: jest.fn(),
  loadedRowsStart: jest.fn(),
  emptyVirtualRows: 'emptyRows',
}));

const defaultDeps = {
  getter: {
    rows: [{ id: 1 }],
    getRowId: row => row.id,
  },
};

const defaultProps = {
  start: 100,
  rowCount: 1000,
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
    it('should provide value from "start" property', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <VirtualTableState
            {...defaultProps}
            start={200}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).start)
        .toBe(200);
    });

    it('should provide value from "rowCount" property', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <VirtualTableState
            {...defaultProps}
            rowCount={2000}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).totalRowCount)
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
          defaultProps.start,
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


  });

});

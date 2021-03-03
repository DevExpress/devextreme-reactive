// tslint:disable: max-classes-per-file
import * as React from 'react';
import {
  getRequestMeta,
  virtualRowsWithCache, trimRowsToInterval,
  emptyVirtualRows,
  plainRows, getReferenceIndex,
  loadedRowsStart, needFetchMorePages, shouldSendRequest,
} from '@devexpress/dx-grid-core';
import { PluginHost } from '@devexpress/dx-react-core';
import { mount } from 'enzyme';
import {
  pluginDepsToComponents, getComputedState, executeComputedAction,
} from '@devexpress/dx-testing';
import { VirtualTableState } from './virtual-table-state';

jest.mock('@devexpress/dx-grid-core', () => ({
  ...jest.requireActual('@devexpress/dx-grid-core'),
  virtualRowsWithCache: jest.fn(),
  plainRows: jest.fn(),
  loadedRowsStart: jest.fn(),
  needFetchMorePages: jest.fn(),
  getReferenceIndex: jest.fn(),
  shouldSendRequest: jest.fn(),
  getRequestMeta: jest.fn(),
  trimRowsToInterval: jest.fn(),
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
  pageSize: 50,
};

describe('VirtualTableState', () => {
  beforeEach(() => {
    virtualRowsWithCache.mockImplementation(() => 'virtualRowsWithCache');
    plainRows.mockImplementation(() => 'plainRows');
    loadedRowsStart.mockImplementation(() => 'loadedRowsStart');
    getReferenceIndex.mockReturnValue('getReferenceIndex');
    getRequestMeta.mockReturnValue({
      requestedRange: 'requestedRange', actualBounds: 'actualBounds',
    });
    trimRowsToInterval.mockReturnValue('trimRowsToInterval');
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

    describe('availableRowCount', () => {
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

      describe('infinite scrolling', () => {
        it('should provide value "pageSize * 2" if it is less than "totalRowCount"', () => {
          const tree = mount((
            <PluginHost>
              {pluginDepsToComponents(defaultDeps)}
              <VirtualTableState
                {...defaultProps}
                totalRowCount={2000}
                infiniteScrolling
              />
            </PluginHost>
          ));

          expect(getComputedState(tree).availableRowCount)
            .toBe(defaultProps.pageSize * 2);
        });

        it('should provide value from "totalRowCount" if it is less than "pageSize * 2"', () => {
          const tree = mount((
            <PluginHost>
              {pluginDepsToComponents(defaultDeps)}
              <VirtualTableState
                {...defaultProps}
                totalRowCount={70}
                infiniteScrolling
              />
            </PluginHost>
          ));

          expect(getComputedState(tree).availableRowCount)
            .toBe(70);
        });

        it('should calculate correctly when "totalRowCount" property changes', () => {
          class Test extends React.Component {
            render() {
              return (
                <PluginHost>
                  {pluginDepsToComponents(defaultDeps)}
                  <VirtualTableState
                    {...this.props}
                  />
                </PluginHost>
              );
            }
          }

          const tree = mount((
            <Test
              {...defaultProps}
              totalRowCount={1000}
              infiniteScrolling
            />
          ));

          expect(getComputedState(tree).availableRowCount)
            .toBe(defaultProps.pageSize * 2);

          tree.setProps({ totalRowCount: 5 });
          tree.update();
          expect(getComputedState(tree).availableRowCount)
            .toBe(5);

          tree.setProps({ totalRowCount: 50 });
          tree.update();
          expect(getComputedState(tree).availableRowCount)
            .toBe(50);

          tree.setProps({ totalRowCount: 500 });
          tree.update();
          expect(getComputedState(tree).availableRowCount)
            .toBe(defaultProps.pageSize * 2);
        });

        describe('requestStartIndex', () => {
          const pageSize = 50;
          class Test extends React.Component {
            render() {
              return (
                <PluginHost>
                  {pluginDepsToComponents(defaultDeps)}
                  <VirtualTableState
                    pageSize={pageSize}
                    {...this.props}
                  />
                </PluginHost>
              );
            }
          }
          let tree;

          const scrollTable = (position) => {
            getRequestMeta.mockReturnValue({
              requestedRange: { start: position, end: position + pageSize },
              actualBounds: { start: position - pageSize, end: position + pageSize * 2 },
            });
            executeComputedAction(tree, actions => actions.requestNextPage({}));
            jest.runAllTimers();
            tree.update();
          };

          beforeEach(() => {
            jest.useFakeTimers();
            shouldSendRequest.mockReturnValue(true);

            tree = mount((
              <Test
                {...defaultProps}
                totalRowCount={1000}
                infiniteScrolling
              />
            ));
          });

          it('should reset "requestedStartIndex" when "totalRowCount" less than pageSize', () => {
            const node = tree.find(VirtualTableState);

            expect(node.state())
              .toEqual({
                virtualRowsCache: emptyVirtualRows,
                availableRowCount: 100,
                requestedStartIndex: 0,
              });

            scrollTable(100);
            expect(node.state())
              .toEqual({
                virtualRowsCache: 'trimRowsToInterval',
                availableRowCount: 200,
                requestedStartIndex: 100,
              });

            tree.setProps({ totalRowCount: 0 });
            expect(node.state())
              .toEqual({
                virtualRowsCache: emptyVirtualRows,
                availableRowCount: 0,
                requestedStartIndex: 0,
              });
          });

          it('should keep "requestedStartIndex" less that "availableRowCount" value', () => {
            const node = tree.find(VirtualTableState);

            expect(node.state())
              .toEqual({
                virtualRowsCache: emptyVirtualRows,
                availableRowCount: 100,
                requestedStartIndex: 0,
              });

            scrollTable(100);
            expect(node.state())
              .toEqual({
                virtualRowsCache: 'trimRowsToInterval',
                availableRowCount: 200,
                requestedStartIndex: 100,
              });

            tree.setProps({ totalRowCount: 100 });
            expect(node.state())
              .toEqual({
                virtualRowsCache: emptyVirtualRows,
                availableRowCount: 100,
                requestedStartIndex: 50,
              });
          });
        });
      });
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
        .toBeCalledWith('virtualRowsWithCache', defaultProps.totalRowCount);
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
        .toBeCalledWith('virtualRowsWithCache', defaultProps.totalRowCount);
    });

    describe('Reload rows', () => {
      beforeEach(() => {
        jest.useFakeTimers();

        const actual = jest.requireActual('@devexpress/dx-grid-core');
        getRequestMeta.mockImplementation((...args) => (
          actual.getRequestMeta(...args)
        ));
        trimRowsToInterval.mockImplementation((...args) => (
          actual.trimRowsToInterval(...args)
        ));
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
          .toHaveBeenNthCalledWith(1, 0, 100); // reload from top
        expect(getRows)
          .toHaveBeenNthCalledWith(2, 0, 100); // both calls should have same args
      });

      it('should reload rows when search value changed', () => {
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

        executeComputedAction(tree, actions => actions.changeSearchValue({}));
        jest.runAllTimers();

        expect(getRows).toHaveBeenCalledTimes(2);
        expect(getRows)
          .toHaveBeenNthCalledWith(1, 0, 100);
        expect(getRows)
          .toHaveBeenNthCalledWith(2, 0, 100);
      });

      it('should reload rows when grouping changed', () => {
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

        executeComputedAction(tree, actions => actions.changeColumnGrouping({}));
        jest.runAllTimers();

        expect(getRows).toHaveBeenCalledTimes(2);
        expect(getRows)
          .toHaveBeenNthCalledWith(1, 0, 100);
        expect(getRows)
          .toHaveBeenNthCalledWith(2, 0, 100);
      });
    });
  });

  describe('actions', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    describe('setViewport', () => {
      beforeEach(() => {
        shouldSendRequest.mockReturnValue(true);
      });

      it('should load rows if necessary', () => {
        const getRows = jest.fn();
        needFetchMorePages.mockReturnValue(true);

        const tree = mount((
          <PluginHost>
            {pluginDepsToComponents(defaultDeps)}
            <VirtualTableState
              {...defaultProps}
              getRows={getRows}
            />
          </PluginHost>
        ));
        getRows.mockClear();

        executeComputedAction(tree, actions => actions.setViewport('newViewport'));
        jest.runAllTimers();

        expect(getReferenceIndex)
          .toBeCalledWith('newViewport');
        expect(needFetchMorePages)
          .toBeCalledWith('virtualRowsWithCache', 'getReferenceIndex', 50);
        expect(getRows)
          .toBeCalledTimes(1);
      });

      it('should not load rows otherwise', () => {
        const getRows = jest.fn();
        needFetchMorePages.mockReturnValue(false);

        const tree = mount((
          <PluginHost>
            {pluginDepsToComponents(defaultDeps)}
            <VirtualTableState
              {...defaultProps}
              getRows={getRows}
            />
          </PluginHost>
        ));
        getRows.mockClear();

        executeComputedAction(tree, actions => actions.setViewport('newViewport'));
        jest.runAllTimers();

        expect(getRows)
          .not.toBeCalled();
      });
    });
  });
});

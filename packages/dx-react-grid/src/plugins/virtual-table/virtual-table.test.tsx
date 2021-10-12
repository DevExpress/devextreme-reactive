import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost, Template } from '@devexpress/dx-react-core';
import {
  isStubTableCell,
  tableRowsWithDataRows,
  checkColumnWidths,
} from '@devexpress/dx-grid-core';
import { makeVirtualTable } from './virtual-table';
import { Table } from '../table';
import {
  pluginDepsToComponents, getComputedState, executeComputedAction,
} from '@devexpress/dx-testing';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableColumnsWithDataRows: jest.fn(),
  tableRowsWithDataRows: jest.fn(),
  getColumnWidthGetter: jest.fn(),
  visibleRowsBounds: jest.fn(),
  getRowsRenderBoundary: jest.fn(),
  isStubTableCell: jest.fn(),
  checkColumnWidths: jest.fn(),
  checkTableColumnExtensions: jest.fn(),
  calculateScrollHeight: jest.fn(),
  getScrollTop: jest.fn(),
  getTopRowId: jest.fn(),
}));

describe('#makeVirtualTable', () => {
  const VirtualLayoutMock = ({ height = 0 }) => (
    <div style={{ height }} />
  );
  const Container = props => <div {...props} />;
  const TableMock = ({ layoutComponent: LayoutComponent }) => (
    <Template name="tableLayout">
      {params => <LayoutComponent {...params} />}
    </Template>
  );
  TableMock.components = {} as any;
  const defaultVirtualTableProps = {
    VirtualLayout: VirtualLayoutMock,
    FixedHeader: () => null,
    FixedFooter: () => null,
    SkeletonCell: () => null,
    defaultEstimatedRowHeight: 30,
    defaultHeight: 400,
    minColumnWidth: 100,
  };
  const defaultDeps = {
    getter: {
      loadedRowsStart: 'loadedRowsStart',
      viewport: 'viewport',
      availableRowCount: 100,
      getRowId: row => row.key,
      columns: [
        { key: 'a', column: { name: 'a' } },
        { key: 'b', column: { name: 'b' } },
        { key: 'c', column: { name: 'c' } },
      ],
      tableColumns: [
        { key: 'a', column: { name: 'a' } },
        { key: 'b', column: { name: 'b' } },
        { key: 'c', column: { name: 'c' } },
      ],
      rows: [
        { key: 1 },
        { key: 2 },
        { key: 3 },
      ],
      tableBodyRows: [
        { key: 1 },
        { key: 2 },
        { key: 3 },
      ],
    },
    action: {
      setViewport: jest.fn(),
      scrollToRow: jest.fn(),
      scrollToColumn: jest.fn(),
    },
    template: {
      tableLayout: {
        containerComponent: Container,
      },
    },
  };

  beforeEach(() => {
    tableRowsWithDataRows.mockImplementation(() => 'tableRowsWithDataRows');
    checkColumnWidths.mockImplementation(() => 'checkColumnWidths');
  });

  describe('viewport', () => {
    const VirtualTable = makeVirtualTable(TableMock, defaultVirtualTableProps);
    it('should provide viewport getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <VirtualTable />
        </PluginHost>
      ));

      tree.find(VirtualTable).setState({ viewport: 'viewport' });
      tree.update();

      expect(getComputedState(tree).viewport)
        .toBe('viewport');
    });

    it('should update value after setViewport action was called', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <VirtualTable />
        </PluginHost>
      ));

      executeComputedAction(tree, actions => actions.setViewport('viewport'));

      expect(getComputedState(tree).viewport)
        .toBe('viewport');
    });
  });

  describe('tableColumns', () => {
    const VirtualTable = makeVirtualTable(TableMock, defaultVirtualTableProps);

    it('should provide tableColumns getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <VirtualTable />
        </PluginHost>
      ));

      expect(checkColumnWidths)
        .toBeCalledWith(defaultDeps.getter.tableColumns);
      expect(getComputedState(tree).tableColumns)
        .toBe('checkColumnWidths');
    });
  });

  describe('scrollToRow', () => {
    const VirtualTable = makeVirtualTable(TableMock, defaultVirtualTableProps);

    it('should provide scrollToRow action', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <VirtualTable />
        </PluginHost>
      ));

      executeComputedAction(tree, actions => actions.scrollToRow());

      expect(defaultDeps.action.scrollToRow)
        .toHaveBeenCalled();
    });
  });

  describe('scrollToColumn', () => {
    const VirtualTable = makeVirtualTable(TableMock, defaultVirtualTableProps);

    it('should provide scrollToColumn action', () => {
      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <VirtualTable />
        </PluginHost>,
      );

      executeComputedAction(tree, actions => actions.scrollToColumn());

      expect(defaultDeps.action.scrollToColumn)
        .toHaveBeenCalled();
    });
  });

  describe('Table layout', () => {
    const VirtualTable = makeVirtualTable(TableMock, defaultVirtualTableProps);
    it('should pass initial props', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <VirtualTable />
        </PluginHost>
      ));

      expect(tree.find(VirtualLayoutMock).props())
        .toMatchObject({
          height: defaultVirtualTableProps.defaultHeight,
          estimatedRowHeight: defaultVirtualTableProps.defaultEstimatedRowHeight,
          headTableComponent: defaultVirtualTableProps.FixedHeader,
          footerTableComponent: defaultVirtualTableProps.FixedFooter,
          totalRowCount: defaultDeps.getter.availableRowCount,
          loadedRowsStart: defaultDeps.getter.loadedRowsStart,
        });
    });

    it('should pass viewport', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <VirtualTable />
        </PluginHost>
      ));

      tree.find(VirtualTable).setState({ viewport: 'viewport' });
      tree.update();

      expect(tree.find(VirtualLayoutMock).prop('viewport'))
        .toBe('viewport');
    });

    it('should pass the setViewport action', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <VirtualTable />
        </PluginHost>
      ));
      const setViewport = tree.find(VirtualLayoutMock)
        .prop('setViewport') as () => void;

      setViewport();

      expect(defaultDeps.action.setViewport)
        .toHaveBeenCalled();
    });

    it('should update connected props', () => {
      const WrappedVirtualTable = ({ height }) => (
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <VirtualTable height={height} />
        </PluginHost>
      );
      const tree = mount((
        <WrappedVirtualTable height={200} />
      ));
      expect(tree.find(VirtualLayoutMock).prop('height'))
        .toBe(200);

      tree.setProps({ height: 300 });
      tree.update();

      expect(tree.find(VirtualLayoutMock).prop('height'))
        .toBe(300);
    });
  });

  describe('inner plugins', () => {
    describe('Table', () => {
      it('should pass layoutComponent to the Table', () => {
        const defaultProps = {
          footerTableComponent: () => null,
          headTableComponent: () => null,
        };
        const VirtualTable = makeVirtualTable(Table, defaultVirtualTableProps);
        const tree = mount((
          <PluginHost>
            {pluginDepsToComponents(defaultDeps)}
            <VirtualTable
              {...defaultProps}
            />
          </PluginHost>
        ));

        expect(tree.find(VirtualLayoutMock).props())
          .toMatchObject(defaultProps);
      });

      it('should pass rest props to a Table', () => {
        const columnExtensions = [{ name: 'a', width: 0 }];
        const VirtualTable = makeVirtualTable(TableMock, defaultVirtualTableProps);
        const tree = mount((
          <PluginHost>
            <VirtualTable columnExtensions={columnExtensions} />
          </PluginHost>
        ));

        expect(tree.find(TableMock).prop('columnExtensions'))
          .toEqual(columnExtensions);
      });
    });

  });

  it('should render skeleton stub cell when data is remote', () => {
    isStubTableCell.mockImplementation(() => true);
    const VirtualTable = makeVirtualTable(TableMock, defaultVirtualTableProps);
    const deps = {
      template: {
        tableCell: {
          tableRow: { type: 'undefined', rowId: 1, row: 'row' },
          tableColumn: { type: 'undefined', column: 'column' },
          style: {},
        },
        tableRow: {
          tableRow: { type: 'undefined', rowId: 1, row: 'row' },
          style: {},
        },
      },
      getter: {
        isDataRemote: true,
      },
    };

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, deps)}
        <VirtualTable />
      </PluginHost>
    ));

    expect(isStubTableCell)
      .toBeCalledWith(deps.template.tableCell.tableRow);
    expect(tree.find(defaultVirtualTableProps.SkeletonCell).props())
      .toMatchObject(deps.template.tableCell);
  });

  it('should not render skeleton stub cell when data is local', () => {
    isStubTableCell.mockImplementation(() => true);
    const VirtualTable = makeVirtualTable(TableMock, defaultVirtualTableProps);
    const deps = {
      template: {
        tableCell: {
          tableRow: { type: 'undefined', rowId: 1, row: 'row' },
          tableColumn: { type: 'undefined', column: 'column' },
          style: {},
        },
        tableRow: {
          tableRow: { type: 'undefined', rowId: 1, row: 'row' },
          style: {},
        },
      },
      getter: {
        isDataRemote: false,
      },
    };

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, deps)}
        <VirtualTable />
      </PluginHost>
    ));

    expect(isStubTableCell)
      .toBeCalledWith(deps.template.tableCell.tableRow);
    expect(tree.find(defaultVirtualTableProps.SkeletonCell).exists())
      .toBeFalsy();
  });

  it('should expose Table components', () => {
    TableMock.components = {
      someComponent: 'SomeComponent',
    };
    TableMock.SomeComponent = () => null;
    const VirtualTable = makeVirtualTable(TableMock, defaultVirtualTableProps);

    expect(VirtualTable.SomeComponent).toBe(TableMock.SomeComponent);
  });
});

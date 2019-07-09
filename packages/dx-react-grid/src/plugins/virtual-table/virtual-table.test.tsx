import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost, Template } from '@devexpress/dx-react-core';
import {
  isStubTableCell,
  tableRowsWithDataRows,
  visibleRowsBounds,
} from '@devexpress/dx-grid-core';
import { makeVirtualTable } from './virtual-table';
import { Table } from '../table';
import { pluginDepsToComponents } from '@devexpress/dx-testing';
import { RemoteDataLoader } from './remote-data-loader';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableColumnsWithDataRows: jest.fn(),
  tableRowsWithDataRows: jest.fn(),
  getColumnWidthGetter: jest.fn(),
  visibleRowsBounds: jest.fn(),
  getRowsRenderBoundary: jest.fn(),
  isStubTableCell: jest.fn(),
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
      ensureNextVirtualPage: jest.fn(),
    },
    template: {
      tableLayout: {
        containerComponent: Container,
      },
    },
  };

  beforeEach(() => {
    tableRowsWithDataRows.mockImplementation(() => 'tableRowsWithDataRows');
    visibleRowsBounds.mockImplementation(() => []);
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

    it('should pass the ensureNextVirtualPage action', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <VirtualTable />
        </PluginHost>
      ));
      const ensureNextVirtualPage = tree.find(VirtualLayoutMock)
        .prop('ensureNextVirtualPage') as () => void;

      ensureNextVirtualPage();

      expect(defaultDeps.action.ensureNextVirtualPage)
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

    it('should add RemoteDataLoadedPlugin', () => {
      const VirtualTable = makeVirtualTable(TableMock, defaultVirtualTableProps);
      const tree = mount((
        <PluginHost>
          <VirtualTable />
        </PluginHost>
      ));

      expect(tree.find(RemoteDataLoader))
        .toBeTruthy();
    });

  });

  it('should render skeleton stub cell when data remote', () => {
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

  it('should not render skeleton stub cell when data local', () => {
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

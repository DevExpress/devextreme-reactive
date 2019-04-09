import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  getCollapsedGrid,
  getColumnWidthGetter,
} from '@devexpress/dx-grid-core';
import { makeVirtualTable } from './virtual-table';
import { Table } from '../table';
import { pluginDepsToComponents } from '@devexpress/dx-testing';
import { RemoteDataLoader } from './remote-data';
import { VirtualTableViewport } from './virtual-table-viewport';

describe('#makeVirtualTable', () => {
  const VirtualLayoutMock = ({ height }) => (
    <div style={{ height }} />
  );
  const TableMock = ({ layoutComponent: LayoutComponent }) => (
    <LayoutComponent />
  );
  TableMock.components = [];
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
      getRowId: row => row.key,
      columns: [
        { key: 'a', column: { name: 'a' } },
        { key: 'b', column: { name: 'b' } },
        { key: 'c', column: { name: 'c' } },
      ],
      rows: [
        { key: 1 },
        { key: 2 },
        { key: 3 },
      ],
    },
    template: {
      body: undefined,
    },
  };

  describe('Table layout', () => {
    const VirtualTable = makeVirtualTable(TableMock, defaultVirtualTableProps);
    it('should pass initial props', () => {
      const tree = mount((
        <PluginHost>
          <VirtualTable />
        </PluginHost>
      ));

      expect(tree.find(VirtualLayoutMock).props())
        .toEqual({
          height: defaultVirtualTableProps.defaultHeight,
          estimatedRowHeight: defaultVirtualTableProps.defaultEstimatedRowHeight,
          headTableComponent: defaultVirtualTableProps.FixedHeader,
          footerTableComponent: defaultVirtualTableProps.FixedFooter,
        });
    });

    it('should update connected props', () => {
      const WrappedVirtualTable = ({ height }) => (
        <PluginHost>
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
      it('should pass layoutComponent', () => {
        const defaultProps = {
          tableComponent: () => null,
          headComponent: () => null,
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

    describe('VirtualTableViewport', () => {
      it('should pass props to viewport plugin', () => {
        const VirtualTable = makeVirtualTable(TableMock, defaultVirtualTableProps);
        const tree = mount((
          <PluginHost>
            <VirtualTable
              estimatedRowHeight={40}
              minColumnWidth={100}
            />
          </PluginHost>
        ));

        expect(tree.find(VirtualTableViewport).props())
          .toEqual({
            estimatedRowHeight: 40,
            minColumnWidth: 100,
          });
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

  it('should render skeleton stub cell using skeletonCellComponent', () => {

  });
});

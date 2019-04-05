/* eslint-disable react/prop-types */
import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost, Sizer } from '@devexpress/dx-react-core';
import {
  getCollapsedGrid,
  getColumnWidthGetter,
} from '@devexpress/dx-grid-core';
import { makeVirtualTable } from './virtual-table';
import { Table } from '../plugins/table';
import { pluginDepsToComponents } from '@devexpress/dx-testing';

jest.mock('react-dom', () => ({
  findDOMNode: jest.fn(),
}));
jest.mock('@devexpress/dx-react-core', () => {
  const { Component } = require.requireActual('react');
  return {
    ...require.requireActual('@devexpress/dx-react-core'),
    Sizer: class extends React.Component {
      componentDidMount() {
        const { onSizeChange } = this.props;
        onSizeChange({ width: 600, height: 120 });
      }

      render() {
        const { containerComponent: Container, onSizeChange, ...restProps } = this.props;
        return (
          <Container {...restProps} />
        );
      }
    },
    // tslint:disable-next-line: max-classes-per-file
    RefHolder: class extends Component {
      render() {
        const { children: propsChildren } = this.props;
        return propsChildren;
      }
    },
  };
});

jest.mock('@devexpress/dx-grid-core', () => {
  const actual = require.requireActual('@devexpress/dx-grid-core');
  jest.spyOn(actual, 'getCollapsedGrid');
  jest.spyOn(actual, 'getColumnWidthGetter');
  jest.spyOn(actual, 'getRowsRenderBoundary');
  return actual;
});

describe('#makeVirtualTable', () => {
  const TableMock = ({ layoutComponent: LayoutComponent }) => (
    <LayoutComponent />
  );
  TableMock.components = [];
  const VirtualLayoutMock = ({ height }) => (
    <div height={height} />
  );
  const defaultVirtualTableProps = {
    VirtualLayout: VirtualLayoutMock,
    defaultEstimatedRowHeight: 30,
    defaultHeight: 400,
    minColumnWidth: 100,
  };
  const VirtualTable = makeVirtualTable(TableMock, defaultVirtualTableProps);
  const defaultDeps = {
    getter: {
      getRowId: row => row.key,
      columns: [
        { key: 'a', column: { name: 'a' } },
        { key: 'b', column: { name: 'b' } },
        { key: 'c', column: { name: 'c' } },
        { key: 'd', column: { name: 'd' } },
        { key: 'e', column: { name: 'e' } },
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
      loadedRowsStart: 'loadedRowsStart',
    },
    template: {
      body: undefined,
    },
  };
  const defaultProps = {
    minWidth: 400,
    minColumnWidth: 120,
    height: 100,
    estimatedRowHeight: 40,
    containerComponent: props => <div {...props} />,
    headTableComponent: ({ tableRef, ...props }) => <table {...props} />,
    tableComponent: ({ tableRef, ...props }) => <table {...props} />,
    headComponent: props => <thead {...props} />,
    bodyComponent: props => <tbody {...props} />,
    rowComponent: () => null,
    cellComponent: () => null,
    getCellColSpan: () => 1,
    tableRef: React.createRef<HTMLTableElement>(),
  };

  it('should update layout height from props', () => {
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

  describe('Sizer container', () => {
    const RealVirtualTable = makeVirtualTable(Table, defaultVirtualTableProps);

    it('should apply auto height', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <RealVirtualTable {...defaultProps} height={'auto'}/>
        </PluginHost>
      ));

      expect(tree.find(Sizer).prop('style').height)
        .toBeUndefined();
    });
  });

  describe('VirtualTableLayout template', () => {
    const RealVirtualTable = makeVirtualTable(Table, {
      VirtualLayout: VirtualLayoutMock,
      defaultEstimatedRowHeight: 30,
      defaultHeight: 400,
      minColumnWidth: 100,
    });

    it('should pass handler functions', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <RealVirtualTable {...defaultProps} />
        </PluginHost>
      ));

      expect(tree.find(VirtualLayoutMock).props())
        .toMatchObject({
          blockRefsHandler: expect.any(Function),
          rowRefsHandler: expect.any(Function),
          onUpdate: expect.any(Function),
          getRowHeight: expect.any(Function),
        });
    });

    it('should pass remote data info', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <RealVirtualTable {...defaultProps} />
        </PluginHost>
      ));

      expect(tree.find(VirtualLayoutMock).props())
        .toMatchObject({
          visibleRowBoundaries: [NaN, NaN],
          totalRowCount: 3,
          loadedRowsStart: 'loadedRowsStart',
        });
    });

    it('should pass container dimensions from state', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <RealVirtualTable {...defaultProps} />
        </PluginHost>
      ));

      expect(tree.find(VirtualLayoutMock).props())
        .toMatchObject({
          containerHeight: 120,
          containerWidth: 600,
        });
    });

    it('should pass grid dimension from state', () => {
      const gridDimensions = {
        headerHeight: 80,
        bodyHeight: 500,
        footerHeight: 100,
        containerHeight: 900,
        containerWidth: 1000,
        viewportLeft: 200,
      };

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <RealVirtualTable {...defaultProps} />
        </PluginHost>
      ));

      tree.find(RealVirtualTable).setState(gridDimensions);
      tree.update();

      expect(tree.find(VirtualLayoutMock).props())
        .toMatchObject(gridDimensions);
    });

    it('should use getColumnWidthGetter', () => {
      const getColumnWidth = () => 0;
      getColumnWidthGetter.mockImplementation(() => getColumnWidth);

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <RealVirtualTable {...defaultProps} />
        </PluginHost>
      ));

      expect(tree.find(VirtualLayoutMock).prop('getColumnWidth'))
        .toBe(getColumnWidth);
    });
  });

});

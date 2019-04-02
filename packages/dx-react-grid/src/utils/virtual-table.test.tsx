/* eslint-disable react/prop-types */
import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  getCollapsedGrid,
  getColumnWidthGetter,
} from '@devexpress/dx-grid-core';
import { makeVirtualTable } from './virtual-table';

jest.mock('@devexpress/dx-grid-core', () => {
  const actual = require.requireActual('@devexpress/dx-grid-core');
  jest.spyOn(actual, 'getCollapsedGrid');
  jest.spyOn(actual, 'getColumnWidthGetter');
  return actual;
});

describe('#makeVirtualTable', () => {
  const TableMock = ({ layoutComponent: LayoutComponent }) => (
    <LayoutComponent />
  );
  TableMock.components = [];
  const VirtualTableMock = ({ height }) => (
    <div height={height} />
  );
  const VirtualTable = makeVirtualTable(TableMock, {
    VirtualLayout: VirtualTableMock,
    defaultEstimatedRowHeight: 30,
    defaultHeight: 400,
    minColumnWidth: 100,
  });
  const defaultProps = {
    columns: [
      { key: 'a', column: { name: 'a' } },
      { key: 'b', column: { name: 'b' } },
      { key: 'c', column: { name: 'c' } },
      { key: 'd', column: { name: 'd' } },
      { key: 'e', column: { name: 'e' } },
    ],
    minWidth: 400,
    minColumnWidth: 120,
    height: 100,
    estimatedRowHeight: 40,
    bodyRows: [
      { key: 1 },
      { key: 2 },
      { key: 3 },
      { key: 4 },
      { key: 5 },
      { key: 6 },
      { key: 7 },
      { key: 8 },
      { key: 9 },
    ],
    containerComponent: props => <div {...props} />,
    // eslint-disable-next-line react/prop-types
    headTableComponent: ({ tableRef, ...props }) => <table {...props} />,
    // eslint-disable-next-line react/prop-types
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
    expect(tree.find(VirtualTableMock).prop('height'))
      .toBe(200);

    tree.setProps({ height: 300 });
    tree.update();

    expect(tree.find(VirtualTableMock).prop('height'))
      .toBe(300);
  });

  it('should use getColumnWidthGetter', () => {
    const getColumnWidth = () => 0;
    getColumnWidthGetter.mockImplementationOnce(() => getColumnWidth);

    mount((
      <PluginHost>
        <VirtualTable />
      </PluginHost>
    ));

    expect(getCollapsedGrid.mock.calls[0][0])
      .toMatchObject({
        getColumnWidth,
      });
  });
});

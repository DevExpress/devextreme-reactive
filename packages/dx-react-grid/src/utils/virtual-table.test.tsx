/* eslint-disable react/prop-types */
import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { makeVirtualTable } from './virtual-table';

describe('#makeVirtualTable', () => {
  const TableMock = ({ layoutComponent: LayoutComponent }) => (
    <LayoutComponent />
  );
  TableMock.components = [];
  const VirtualTableMock = ({ height }) => (
    <div height={height} />
  );

  fit('should update layout height from props', () => {
    const VirtualTable = makeVirtualTable(TableMock, {
      VirtualLayout: VirtualTableMock,
    });
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
});

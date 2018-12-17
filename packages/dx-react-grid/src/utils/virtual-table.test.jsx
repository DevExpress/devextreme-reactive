/* eslint-disable react/prop-types */
import * as React from 'react';
import { mount } from 'enzyme';
import { makeVirtualTable } from './virtual-table';

describe('#makeVirtualTable', () => {
  const TableMock = ({ layoutComponent: LayoutComponent }) => (
    <LayoutComponent />
  );
  TableMock.components = [];
  const VirtualTableMock = ({ height }) => (
    <div height={height} />
  );

  it('should update layout height from props', () => {
    const VirtualTable = makeVirtualTable(TableMock, {
      VirtualLayout: VirtualTableMock,
    });
    const tree = mount((
      <VirtualTable height={200} />
    ));
    expect(tree.find(VirtualTableMock).prop('height'))
      .toBe(200);

    tree.setProps({ height: 300 });
    tree.update();

    expect(tree.find(VirtualTableMock).prop('height'))
      .toBe(300);
  });
});

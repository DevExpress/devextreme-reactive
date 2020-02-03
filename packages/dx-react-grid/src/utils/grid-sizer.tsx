import * as React from 'react';	
import { Sizer, SizerProps } from '@devexpress/dx-react-core';	
import { TABLE_STUB_TYPE } from '@devexpress/dx-grid-core';
import { VirtualTableLayoutBlock } from '../components/table-layout/virtual-table-layout-block';

export class GridSizer extends React.PureComponent<SizerProps> {
  ref = React.createRef<Sizer>();

  componentDidUpdate() {
    const children = React.Children.toArray(this.props.children) ?? [];
    const bodyTable = children.find(
      (child: any) => child.props?.name === 'body'
    ) as VirtualTableLayoutBlock;
    const { rows, columns } = bodyTable.props.collapsedGrid;

    const hasStubColumn = columns.some(col => col.type === TABLE_STUB_TYPE);
    const hasStubRow = rows.some(row => row.type === TABLE_STUB_TYPE);

    if (hasStubColumn || hasStubRow) {
        this.ref.current!.setupListeners();
    }
  }

  render() {	
    return <Sizer ref={this.ref} {...this.props} />;	
  }	
}
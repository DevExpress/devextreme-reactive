import * as React from 'react';
import { Sizer, SizerProps } from '@devexpress/dx-react-core';
import { TABLE_STUB_TYPE, CollapsedGrid } from '@devexpress/dx-grid-core';
import { ReadonlyObject } from '@devexpress/dx-core';

// tslint:disable-next-line: max-line-length
export class GridSizer extends React.PureComponent<SizerProps & {collapsedGrid: ReadonlyObject<CollapsedGrid>}> {
  ref = React.createRef<Sizer>();

  componentDidUpdate() {
    const { collapsedGrid: { rows, columns } } = this.props;

    const hasStubColumn = columns.some(col => col.type === TABLE_STUB_TYPE);
    const hasStubRow = rows.some(row => row.type === TABLE_STUB_TYPE);

    if (hasStubColumn || hasStubRow) {
      this.ref.current!.setupListeners();
    }
  }

  render() {
    const { collapsedGrid, ...restProps } = this.props;
    return <Sizer ref={this.ref} {...restProps} />;
  }
}

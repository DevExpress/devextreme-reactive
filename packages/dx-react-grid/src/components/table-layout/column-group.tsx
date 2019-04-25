import * as React from 'react';
import { TableColumn } from '@devexpress/dx-grid-core';

/** @internal */
export class ColumnGroup extends React.PureComponent<{ columns: TableColumn[] }> {
  render() {
    const { columns } = this.props;

    return (
      <colgroup>
        {columns.map(({ key, width }) => (
          <col
            key={key}
            style={width !== undefined
              ? { width: `${width}px` }
              : undefined}
          />
        ))}
      </colgroup>
    );
  }
}

import * as React from 'react';
import { TableColumn } from '@devexpress/dx-grid-core';

/** @internal */
export class ColumnGroup extends React.PureComponent<{ columns: TableColumn[] }> {
  render() {
    const { columns } = this.props;

    return (
      <colgroup>
        {columns.map(({ key, width, preferMinWidth }) => (
          <col
            key={key}
            style={width !== undefined
              ? { [preferMinWidth ? 'minWidth' : 'width']: `${width}px` }
              : null}
          />
        ))}
      </colgroup>
    );
  }
}

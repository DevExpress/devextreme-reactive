import * as React from 'react';
import { TableColumn } from '@devexpress/dx-grid-core';
// import { number } from 'prop-types';

/** @internal */
export class ColumnGroup extends React.PureComponent<{ columns: TableColumn[] }> {
  render() {
    const { columns } = this.props;
    console.log(columns);

    return (
      <colgroup>
        {columns.map(({ key, width }) => {
          const styleWidth = typeof width === 'number' ? `${width}px` : width;
          return (
            <col
              key={key}
              style={width !== undefined
                ? { width: styleWidth }
                : undefined}
            />
          );
        })}
      </colgroup>
    );
  }
}

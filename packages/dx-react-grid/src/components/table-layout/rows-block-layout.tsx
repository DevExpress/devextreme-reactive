import * as React from 'react';
import { RowLayout } from './row-layout';
import { RowsBlockLayoutProps } from '../../types';

/** @internal */
export class RowsBlockLayout extends React.PureComponent<RowsBlockLayoutProps> {
  render() {
    const {
      rows,
      columns,
      blockComponent: Block,
      rowComponent,
      cellComponent,
      getCellColSpan,
    } = this.props;

    return (
      <Block>
        {
          rows
            .map(row => (
              <RowLayout
                key={row.key}
                row={row}
                columns={columns}
                rowComponent={rowComponent}
                cellComponent={cellComponent}
                getCellColSpan={getCellColSpan}
              />
            ))
        }
      </Block>
    );
  }
}

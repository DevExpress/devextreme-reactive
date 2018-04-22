import * as React from 'react';
import * as PropTypes from 'prop-types';
import { RowLayout } from './row-layout';

export class RowsBlockLayout extends React.PureComponent {
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

RowsBlockLayout.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  blockComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  cellComponent: PropTypes.func.isRequired,
  getCellColSpan: PropTypes.func.isRequired,
};

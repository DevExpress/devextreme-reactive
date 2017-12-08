import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableGroupRow as TableGroupRowBase } from '@devexpress/dx-react-grid';
import { TableGroupCell } from '../templates/table-group-row-cell';
import { TableRow } from '../templates/table-row';

const defaultGetCellComponent = () => TableGroupCell;

export class TableGroupRow extends React.PureComponent {
  render() {
    const { getCellComponent, ...restProps } = this.props;

    return (
      <TableGroupRowBase
        getCellComponent={combineTemplates(
          getCellComponent,
          defaultGetCellComponent,
        )}
        rowComponent={TableRow}
        indentColumnWidth={48}
        {...restProps}
      />
    );
  }
}

TableGroupRow.Row = TableRow;
TableGroupRow.Cell = TableGroupCell;

TableGroupRow.propTypes = {
  getCellComponent: PropTypes.func,
};

TableGroupRow.defaultProps = {
  getCellComponent: undefined,
};


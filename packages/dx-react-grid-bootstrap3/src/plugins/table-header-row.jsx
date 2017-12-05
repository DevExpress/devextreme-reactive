import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableHeaderRow as TableHeaderRowBase } from '@devexpress/dx-react-grid';
import { TableHeaderCell } from '../templates/table-header-cell';
import { TableRow } from '../templates/table-row';

const defaultGetHeaderCellComponent = () => TableHeaderCell;

export class TableHeaderRow extends React.PureComponent {
  render() {
    const { getCellComponent, ...restProps } = this.props;

    return (
      <TableHeaderRowBase
        getCellComponent={combineTemplates(
          getCellComponent,
          defaultGetHeaderCellComponent,
        )}
        rowComponent={TableRow}
        {...restProps}
      />
    );
  }
}

TableHeaderRow.Cell = TableHeaderCell;
TableHeaderRow.Row = TableRow;

TableHeaderRow.propTypes = {
  getCellComponent: PropTypes.func,
};

TableHeaderRow.defaultProps = {
  getCellComponent: undefined,
};

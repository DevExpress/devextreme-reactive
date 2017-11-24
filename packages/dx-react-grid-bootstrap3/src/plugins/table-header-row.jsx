import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableHeaderRow as TableHeaderRowBase } from '@devexpress/dx-react-grid';
import { TableHeaderCell } from '../templates/table-header-cell';
import { TableRow } from '../templates/table-row';

const defaultGetHeaderCellComponent = () => TableHeaderCell;

export class TableHeaderRow extends React.PureComponent {
  render() {
    const { getHeaderCellComponent, ...restProps } = this.props;

    return (
      <TableHeaderRowBase
        getHeaderCellComponent={combineTemplates(
          getHeaderCellComponent,
          defaultGetHeaderCellComponent,
        )}
        headerRowComponent={TableRow}
        {...restProps}
      />
    );
  }
}

TableHeaderRow.propTypes = {
  getHeaderCellComponent: PropTypes.func,
};

TableHeaderRow.defaultProps = {
  getHeaderCellComponent: undefined,
};

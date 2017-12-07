import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableFilterRow as TableFilterRowBase } from '@devexpress/dx-react-grid';
import { TableFilterCell } from '../templates/table-filter-cell';
import { TableRow } from '../templates/table-row';

const defaultGetCellComponent = () => TableFilterCell;

export class TableFilterRow extends React.PureComponent {
  render() {
    const { getCellComponent, ...restProps } = this.props;

    return (
      <TableFilterRowBase
        getCellComponent={combineTemplates(
          getCellComponent,
          defaultGetCellComponent,
        )}
        rowComponent={TableRow}
        {...restProps}
      />
    );
  }
}

TableFilterRow.propTypes = {
  getCellComponent: PropTypes.func,
};

TableFilterRow.defaultProps = {
  getCellComponent: undefined,
};

import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableFilterRow as TableFilterRowBase } from '@devexpress/dx-react-grid';
import { TableFilterCell } from '../templates/table-filter-cell';
import { TableRow } from '../templates/table-row';

const defaultGetFilterCellComponent = () => TableFilterCell;

export class TableFilterRow extends React.PureComponent {
  render() {
    const { getFilterCellComponent, ...restProps } = this.props;

    return (
      <TableFilterRowBase
        getFilterCellComponent={combineTemplates(
          getFilterCellComponent,
          defaultGetFilterCellComponent,
        )}
        filterRowComponent={TableRow}
        {...restProps}
      />
    );
  }
}

TableFilterRow.propTypes = {
  getFilterCellComponent: PropTypes.func,
};

TableFilterRow.defaultProps = {
  getFilterCellComponent: undefined,
};

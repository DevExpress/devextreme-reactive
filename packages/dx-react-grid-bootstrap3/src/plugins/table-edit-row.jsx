import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableEditRow as TableEditRowBase } from '@devexpress/dx-react-grid';
import { EditCell } from '../templates/table-edit-cell';
import { TableRow } from '../templates/table-row';

const defaultGetCellComponent = () => EditCell;

export class TableEditRow extends React.PureComponent {
  render() {
    const {
      getCellComponent,
      ...restProps
    } = this.props;

    return (
      <TableEditRowBase
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

TableEditRow.propTypes = {
  getCellComponent: PropTypes.func,
};

TableEditRow.defaultProps = {
  getCellComponent: undefined,
};

import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableEditRow as TableEditRowBase } from '@devexpress/dx-react-grid';
import { EditCell } from '../templates/table-edit-cell';
import { TableRow } from '../templates/table-row';

const defaultGetEditCellComponent = () => EditCell;

export class TableEditRow extends React.PureComponent {
  render() {
    const {
      getEditCellComponent,
      ...restProps
    } = this.props;

    return (
      <TableEditRowBase
        getEditCellComponent={combineTemplates(
          getEditCellComponent,
          defaultGetEditCellComponent,
        )}
        editRowComponent={TableRow}
        {...restProps}
      />
    );
  }
}

TableEditRow.propTypes = {
  getEditCellComponent: PropTypes.func,
};

TableEditRow.defaultProps = {
  getEditCellComponent: undefined,
};

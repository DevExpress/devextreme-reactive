import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableEditRow as TableEditRowBase } from '@devexpress/dx-react-datagrid';
import { EditCell } from '../templates/table-edit-cell';

export const TableEditRow = ({
  editCellTemplate,
  ...restProps
}) => (
  <TableEditRowBase
    {...restProps}
    editCellTemplate={combineTemplates(editCellTemplate, EditCell)}
  />
);
TableEditRow.propTypes = {
  editCellTemplate: PropTypes.func,
};
TableEditRow.defaultProps = {
  editCellTemplate: undefined,
};

import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableEditRow as TableEditRowBase } from '@devexpress/dx-react-grid';
import { EditCell } from '../templates/table-edit-cell';

const defaultEditCellTemplate = props => <EditCell {...props} />;

export const TableEditRow = ({
  editCellTemplate,
  ...restProps
}) => (
  <TableEditRowBase
    editCellTemplate={combineTemplates(
      editCellTemplate,
      defaultEditCellTemplate,
    )}
    {...restProps}
  />
);
TableEditRow.propTypes = {
  editCellTemplate: PropTypes.func,
};
TableEditRow.defaultProps = {
  editCellTemplate: undefined,
};

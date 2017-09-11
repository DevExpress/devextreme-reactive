import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableEditRow as TableEditRowBase } from '@devexpress/dx-react-grid';
import { EditCell } from '../templates/table-edit-cell';
import { TableRow } from '../templates/table-row';

const defaultEditCellTemplate = props => <EditCell {...props} />;
const defaultEditRowTemplate = props => <TableRow {...props} />;

export const TableEditRow = ({
  editCellTemplate,
  editRowTemplate,
  ...restProps
}) => (
  <TableEditRowBase
    editCellTemplate={combineTemplates(
      editCellTemplate,
      defaultEditCellTemplate,
    )}
    editRowTemplate={combineTemplates(
      editRowTemplate,
      defaultEditRowTemplate,
    )}
    {...restProps}
  />
);
TableEditRow.propTypes = {
  editCellTemplate: PropTypes.func,
  editRowTemplate: PropTypes.func,
};
TableEditRow.defaultProps = {
  editCellTemplate: undefined,
  editRowTemplate: undefined,
};

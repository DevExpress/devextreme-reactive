import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableEditRow as TableEditRowBase } from '@devexpress/dx-react-grid';
import { TableRow } from 'material-ui';
import { EditCell } from '../templates/table-edit-cell';

const defaultEditCellTemplate = props => <EditCell {...props} />;
// eslint-disable-next-line react/prop-types
const defaultEditRowTemplate = ({ tableRow, children, ...restProps }) => (
  <TableRow {...restProps}>{children}</TableRow>
);

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

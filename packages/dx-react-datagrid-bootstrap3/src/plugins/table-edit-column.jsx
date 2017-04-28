import React from 'react';
import { TableEditColumn as TableEditColumnBase } from '@devexpress/dx-react-datagrid';
import {
  EditCommandHeadingCell,
  EditCommandCell,
  CommandButton,
} from '../templates/table-edit-command-cell';

export const TableEditColumn = ({
  cellTemplate,
  headingCellTemplate,
  commandTemplate,
  ...restProps
}) => (
  <TableEditColumnBase
    {...restProps}
    cellTemplate={cellTemplate || EditCommandCell}
    headingCellTemplate={headingCellTemplate || EditCommandHeadingCell}
    commandTemplate={commandTemplate || CommandButton}
  />
);
TableEditColumn.propTypes = {
  cellTemplate: React.PropTypes.func,
  headingCellTemplate: React.PropTypes.func,
  commandTemplate: React.PropTypes.func,
};
TableEditColumn.defaultProps = {
  cellTemplate: undefined,
  headingCellTemplate: undefined,
  commandTemplate: undefined,
};

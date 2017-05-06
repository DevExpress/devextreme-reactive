import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
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
    cellTemplate={combineTemplates(cellTemplate, EditCommandCell)}
    headingCellTemplate={combineTemplates(headingCellTemplate, EditCommandHeadingCell)}
    commandTemplate={combineTemplates(commandTemplate, CommandButton)}
  />
);
TableEditColumn.propTypes = {
  cellTemplate: PropTypes.func,
  headingCellTemplate: PropTypes.func,
  commandTemplate: PropTypes.func,
};
TableEditColumn.defaultProps = {
  cellTemplate: undefined,
  headingCellTemplate: undefined,
  commandTemplate: undefined,
};

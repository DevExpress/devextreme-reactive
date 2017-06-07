import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableEditColumn as TableEditColumnBase } from '@devexpress/dx-react-grid';
import {
  EditCommandCell,
  EditCommandHeadingCell,
  CommandButton,
} from '../templates/table-edit-command-cell';

const defaultCellTemplate = props => <EditCommandCell {...props} />;
const defaultHeadingCellTemplate = props => <EditCommandHeadingCell {...props} />;
const defaultCommandTemplate = props => <CommandButton {...props} />;

export const TableEditColumn = ({
  cellTemplate,
  headingCellTemplate,
  commandTemplate,
  ...restProps
}) => (
  <TableEditColumnBase
    width={170}
    {...restProps}
    cellTemplate={combineTemplates(cellTemplate, defaultCellTemplate)}
    headingCellTemplate={combineTemplates(headingCellTemplate, defaultHeadingCellTemplate)}
    commandTemplate={combineTemplates(commandTemplate, defaultCommandTemplate)}
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

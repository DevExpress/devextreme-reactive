import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableGroupRow as TableGroupRowBase } from '@devexpress/dx-react-grid';
import { TableGroupCell } from '../templates/table-group-row-cell';

const defaultGroupCellTemplate = props => <TableGroupCell {...props} />;
// eslint-disable-next-line react/prop-types
const defaultGroupRowTemplate = ({ tableRow, children, ...restProps }) => (
  <tr {...restProps}>{children}</tr>
);

export const TableGroupRow = ({ groupCellTemplate, groupRowTemplate, ...restProps }) => (
  <TableGroupRowBase
    groupCellTemplate={combineTemplates(
      groupCellTemplate,
      defaultGroupCellTemplate,
    )}
    groupRowTemplate={combineTemplates(
      groupRowTemplate,
      defaultGroupRowTemplate,
    )}
    groupIndentColumnWidth={20}
    {...restProps}
  />
);

TableGroupRow.propTypes = {
  groupRowTemplate: PropTypes.func,
  groupCellTemplate: PropTypes.func,
};
TableGroupRow.defaultProps = {
  groupRowTemplate: undefined,
  groupCellTemplate: undefined,
};

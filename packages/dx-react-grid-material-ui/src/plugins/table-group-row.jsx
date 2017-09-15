import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';

import { TableGroupRow as TableGroupRowBase } from '@devexpress/dx-react-grid';
import { TableGroupCell } from '../templates/table-group-row-cell';

const defaultGroupCellTemplate = props => <TableGroupCell {...props} />;

export const TableGroupRow = ({ groupCellTemplate, ...restProps }) => (
  <TableGroupRowBase
    groupCellTemplate={combineTemplates(
      groupCellTemplate,
      defaultGroupCellTemplate,
    )}
    groupIndentColumnWidth={22}
    {...restProps}
  />
);

TableGroupRow.propTypes = {
  groupCellTemplate: PropTypes.func,
};
TableGroupRow.defaultProps = {
  groupCellTemplate: undefined,
};

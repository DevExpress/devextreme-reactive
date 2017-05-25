import React from 'react';
import PropTypes from 'prop-types';

import { TableGroupRow as TableGroupRowBase } from '@devexpress/dx-react-grid';
import { TableGroupRowCell, TableGroupIndentCell } from '../templates/table-group-row-cell';

export const TableGroupRow = props => (
  <TableGroupRowBase
    groupRowCellTemplate={TableGroupRowCell}
    groupIndentCellTemplate={TableGroupIndentCell}
    {...props}
  />
);

TableGroupRow.defaultProps = {
  groupColumnWidth: 20,
};

TableGroupRow.propTypes = {
  groupColumnWidth: PropTypes.number,
};

import React from 'react';
import PropTypes from 'prop-types';

import { TableGroupRow as TableGroupRowBase } from '@devexpress/dx-react-grid';
import { TableGroupRowCell, TableGroupIndentCell } from '../templates/table-group-row-cell';

const groupRowCellTemplate = props => <TableGroupRowCell {...props} />;
const groupIndentCellTemplate = props => <TableGroupIndentCell {...props} />;

export const TableGroupRow = props => (
  <TableGroupRowBase
    groupRowCellTemplate={groupRowCellTemplate}
    groupIndentCellTemplate={groupIndentCellTemplate}
    {...props}
  />
);

TableGroupRow.defaultProps = {
  groupColumnWidth: 24,
};

TableGroupRow.propTypes = {
  groupColumnWidth: PropTypes.number,
};

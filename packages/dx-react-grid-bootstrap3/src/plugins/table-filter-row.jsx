import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableFilterRow as TableFilterRowBase } from '@devexpress/dx-react-grid';
import { TableFilterCell } from '../templates/table-filter-cell';

const defaultFilterCellTemplate = props => <TableFilterCell {...props} />;
// eslint-disable-next-line react/prop-types
const defaultFilterRowTemplate = ({ tableRow, children, ...restProps }) => (
  <tr {...restProps}>{children}</tr>
);

export const TableFilterRow = ({ filterCellTemplate, filterRowTemplate, ...restProps }) => (
  <TableFilterRowBase
    filterCellTemplate={combineTemplates(
      filterCellTemplate,
      defaultFilterCellTemplate,
    )}
    filterRowTemplate={combineTemplates(
      filterRowTemplate,
      defaultFilterRowTemplate,
    )}
    {...restProps}
  />
);

TableFilterRow.propTypes = {
  filterCellTemplate: PropTypes.func,
  filterRowTemplate: PropTypes.func,
};
TableFilterRow.defaultProps = {
  filterCellTemplate: undefined,
  filterRowTemplate: undefined,
};

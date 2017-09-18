import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableFilterRow as TableFilterRowBase } from '@devexpress/dx-react-grid';
import { TableFilterCell } from '../templates/table-filter-cell';
import { TableRow } from '../templates/table-row';

const defaultFilterCellTemplate = props => <TableFilterCell {...props} />;
const defaultFilterRowTemplate = props => <TableRow {...props} />;

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

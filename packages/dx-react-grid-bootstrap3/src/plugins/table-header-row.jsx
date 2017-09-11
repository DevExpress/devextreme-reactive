import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableHeaderRow as TableHeaderRowBase } from '@devexpress/dx-react-grid';
import { TableHeaderCell } from '../templates/table-header-cell';

const defaultHeaderCellTemplate = props => <TableHeaderCell {...props} />;
// eslint-disable-next-line react/prop-types
const defaultHeaderRowTemplate = ({ tableRow, children, ...restProps }) => (
  <tr {...restProps}>{children}</tr>
);

export const TableHeaderRow = ({ headerCellTemplate, headerRowTemplate, ...restProps }) => (
  <TableHeaderRowBase
    headerCellTemplate={combineTemplates(
      headerCellTemplate,
      defaultHeaderCellTemplate,
    )}
    headerRowTemplate={combineTemplates(
      headerRowTemplate,
      defaultHeaderRowTemplate,
    )}
    {...restProps}
  />
);

TableHeaderRow.propTypes = {
  headerCellTemplate: PropTypes.func,
  headerRowTemplate: PropTypes.func,
};
TableHeaderRow.defaultProps = {
  headerCellTemplate: undefined,
  headerRowTemplate: undefined,
};

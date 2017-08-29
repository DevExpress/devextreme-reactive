import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableView as TableViewBase } from '@devexpress/dx-react-grid';
import { Table } from '../templates/table';
import { TableCell } from '../templates/table-cell';
import { TableStubCell } from '../templates/table-stub-cell';
import { TableStubHeaderCell } from '../templates/table-stub-header-cell';
import { TableNoDataCell } from '../templates/table-no-data-cell';

const tableTemplate = props => <Table {...props} />;
const defaultCellTemplate = props => <TableCell {...props} />;
const stubCellTemplate = props => <TableStubCell {...props} />;
const stubHeaderCellTemplate = props => <TableStubHeaderCell {...props} />;
const noDataCellTemplate = props => <TableNoDataCell {...props} />;

// eslint-disable-next-line
const rowTemplate = ({ children, row, ...restProps }) => (<tr
  className={row.selected ? 'active' : ''}
  {...restProps}
>
  {children}
</tr>);

export const TableView = ({ tableCellTemplate, ...props }) => (
  <TableViewBase
    tableTemplate={tableTemplate}
    tableCellTemplate={combineTemplates(
      tableCellTemplate,
      defaultCellTemplate,
    )}
    rowComponentTemplate={rowTemplate}
    tableStubCellTemplate={stubCellTemplate}
    tableStubHeaderCellTemplate={stubHeaderCellTemplate}
    tableNoDataCellTemplate={noDataCellTemplate}
    {...props}
  />
);

TableView.propTypes = {
  tableCellTemplate: PropTypes.func,
};

TableView.defaultProps = {
  tableCellTemplate: undefined,
};

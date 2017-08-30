import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableView as TableViewBase } from '@devexpress/dx-react-grid';
import { VirtualTable } from '../templates/virtual-table';
import { TableCell } from '../templates/table-cell';
import { TableNoDataCell } from '../templates/table-no-data-cell';
import { TableStubCell } from '../templates/table-stub-cell';
import { TableStubHeaderCell } from '../templates/table-stub-header-cell';

// eslint-disable-next-line
const rowTemplate = ({ children, tableRow, ...restProps }) => (<tr
  className={tableRow.selected ? 'active' : ''}
  {...restProps}
>
  {children}
</tr>);

// eslint-disable-next-line
const tableTemplate = ({ tableRowComponentTemplate, ...props }) => {
  return (<VirtualTable tableRowComponentTemplate={tableRowComponentTemplate} {...props} />);
};

const defaultCellTemplate = props => <TableCell {...props} />;
const noDataCellTemplate = props => <TableNoDataCell {...props} />;
const stubCellTemplate = props => <TableStubCell {...props} />;
const stubHeaderCellTemplate = props => <TableStubHeaderCell {...props} />;

export const VirtualTableView = ({ tableCellTemplate, ...props }) => (
  <TableViewBase
    tableTemplate={tableTemplate}
    tableCellTemplate={combineTemplates(
      tableCellTemplate,
      defaultCellTemplate,
    )}
    tableRowComponentTemplate={rowTemplate}
    tableNoDataCellTemplate={noDataCellTemplate}
    tableStubCellTemplate={stubCellTemplate}
    tableStubHeaderCellTemplate={stubHeaderCellTemplate}
    {...props}
  />
);
VirtualTableView.propTypes = {
  tableCellTemplate: PropTypes.func,
};
VirtualTableView.defaultProps = {
  tableCellTemplate: undefined,
};

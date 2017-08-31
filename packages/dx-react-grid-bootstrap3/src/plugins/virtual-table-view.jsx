import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableView as TableViewBase } from '@devexpress/dx-react-grid';
import { VirtualTable } from '../templates/virtual-table';
import { TableCell } from '../templates/table-cell';
import { TableNoDataCell } from '../templates/table-no-data-cell';
import { TableStubCell } from '../templates/table-stub-cell';
import { TableStubHeaderCell } from '../templates/table-stub-header-cell';

const tableTemplate = tableRowComponentTemplate => props => (
  <VirtualTable
    tableRowComponentTemplate={tableRowComponentTemplate}
    {...props}
  />
);
const defaultCellTemplate = props => <TableCell {...props} />;
const noDataCellTemplate = props => <TableNoDataCell {...props} />;
const stubCellTemplate = props => <TableStubCell {...props} />;
const stubHeaderCellTemplate = props => <TableStubHeaderCell {...props} />;

export const VirtualTableView = ({ tableCellTemplate, tableRowComponentTemplate, ...props }) => (
  <TableViewBase
    tableTemplate={tableTemplate(tableRowComponentTemplate)}
    tableCellTemplate={combineTemplates(
      tableCellTemplate,
      defaultCellTemplate,
    )}
    tableNoDataCellTemplate={noDataCellTemplate}
    tableStubCellTemplate={stubCellTemplate}
    tableStubHeaderCellTemplate={stubHeaderCellTemplate}
    {...props}
  />
);
VirtualTableView.propTypes = {
  tableCellTemplate: PropTypes.func,
  tableRowComponentTemplate: PropTypes.func,
};
VirtualTableView.defaultProps = {
  tableCellTemplate: undefined,
  tableRowComponentTemplate: undefined,
};

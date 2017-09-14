import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableView as TableViewBase } from '@devexpress/dx-react-grid';
import { VirtualTable } from '../templates/virtual-table';
import { TableCell } from '../templates/table-cell';
import { TableRow } from '../templates/table-row';
import { TableNoDataCell } from '../templates/table-no-data-cell';
import { TableStubCell } from '../templates/table-stub-cell';
import { TableStubHeaderCell } from '../templates/table-stub-header-cell';

const tableLayoutTemplate = props => <VirtualTable {...props} />;
const defaultRowTemplate = props => <TableRow {...props} />;
const defaultCellTemplate = props => <TableCell {...props} />;
const defaultNoDataRowTemplate = props => <TableRow {...props} />;
const defaultNoDataCellTemplate = props => <TableNoDataCell {...props} />;
const defaultStubCellTemplate = props => <TableStubCell {...props} />;
const defaultStubHeaderCellTemplate = props => <TableStubHeaderCell {...props} />;


export const VirtualTableView = ({
  tableCellTemplate,
  tableRowTemplate,
  tableNoDataRowTemplate,
  noDataCellTemplate,
  stubCellTemplate,
  stubHeaderCellTemplate,
  ...props
}) => (
  <TableViewBase
    tableLayoutTemplate={tableLayoutTemplate}
    tableRowTemplate={combineTemplates(
      tableRowTemplate,
      defaultRowTemplate,
    )}
    tableNoDataRowTemplate={combineTemplates(
      tableNoDataRowTemplate,
      defaultNoDataRowTemplate,
    )}
    tableCellTemplate={combineTemplates(
      tableCellTemplate,
      defaultCellTemplate,
    )}
    tableNoDataCellTemplate={combineTemplates(
      noDataCellTemplate,
      defaultNoDataCellTemplate,
    )}
    tableStubCellTemplate={combineTemplates(
      stubCellTemplate,
      defaultStubCellTemplate,
    )}
    tableStubHeaderCellTemplate={combineTemplates(
      stubHeaderCellTemplate,
      defaultStubHeaderCellTemplate,
    )}
    {...props}
  />
);
VirtualTableView.propTypes = {
  tableCellTemplate: PropTypes.func,
  tableRowTemplate: PropTypes.func,
  tableNoDataRowTemplate: PropTypes.func,
  noDataCellTemplate: PropTypes.func,
  stubCellTemplate: PropTypes.func,
  stubHeaderCellTemplate: PropTypes.func,
};
VirtualTableView.defaultProps = {
  tableCellTemplate: undefined,
  tableRowTemplate: undefined,
  tableNoDataRowTemplate: undefined,
  noDataCellTemplate: undefined,
  stubCellTemplate: undefined,
  stubHeaderCellTemplate: undefined,
};

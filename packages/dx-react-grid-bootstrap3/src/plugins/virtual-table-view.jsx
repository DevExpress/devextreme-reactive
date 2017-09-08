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
// eslint-disable-next-line react/prop-types
const defaultNoDataRowTemplate = ({ tableRow, children, ...restProps }) => (
  <tr {...restProps}>{children}</tr>
);
const noDataCellTemplate = props => <TableNoDataCell {...props} />;
const stubCellTemplate = props => <TableStubCell {...props} />;
const stubHeaderCellTemplate = props => <TableStubHeaderCell {...props} />;

export const VirtualTableView = ({
  tableCellTemplate,
  tableRowTemplate,
  tableNoDataRowTemplate,
  ...props }) => (
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
      tableNoDataCellTemplate={noDataCellTemplate}
      tableStubCellTemplate={stubCellTemplate}
      tableStubHeaderCellTemplate={stubHeaderCellTemplate}
      {...props}
    />
);
VirtualTableView.propTypes = {
  tableCellTemplate: PropTypes.func,
  tableRowTemplate: PropTypes.func,
  tableNoDataRowTemplate: PropTypes.func,
};
VirtualTableView.defaultProps = {
  tableCellTemplate: undefined,
  tableRowTemplate: undefined,
  tableNoDataRowTemplate: undefined,
};

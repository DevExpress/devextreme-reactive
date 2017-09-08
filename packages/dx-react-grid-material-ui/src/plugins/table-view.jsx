import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableView as TableViewBase } from '@devexpress/dx-react-grid';
import { TableRow as TableRowMUI } from 'material-ui';
import { Table } from '../templates/table';
import { TableCell } from '../templates/table-cell';
import { TableRow } from '../templates/table-row';
import { TableStubCell } from '../templates/table-stub-cell';
import { TableNoDataCell } from '../templates/table-no-data-cell';

const tableLayoutTemplate = props => <Table {...props} />;
const defaultRowTemplate = props => <TableRow {...props} />;
// eslint-disable-next-line react/prop-types
const defaultNoDataRowTemplate = ({ tableRow, children, ...restProps }) => (
  <TableRowMUI {...restProps}>{children}</TableRowMUI>
);
const defaultCellTemplate = props => <TableCell {...props} />;
const stubCellTemplate = props => <TableStubCell {...props} />;
const noDataCellTemplate = props => <TableNoDataCell {...props} />;

export const TableView = ({
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
      tableStubCellTemplate={stubCellTemplate}
      tableStubHeaderCellTemplate={stubCellTemplate}
      tableNoDataCellTemplate={noDataCellTemplate}
      {...props}
    />
);
TableView.propTypes = {
  tableCellTemplate: PropTypes.func,
  tableRowTemplate: PropTypes.func,
  tableNoDataRowTemplate: PropTypes.func,
};
TableView.defaultProps = {
  tableCellTemplate: undefined,
  tableRowTemplate: undefined,
  tableNoDataRowTemplate: undefined,
};

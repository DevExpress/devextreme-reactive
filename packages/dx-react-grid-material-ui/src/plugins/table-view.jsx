import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableView as TableViewBase } from '@devexpress/dx-react-grid';
import { Table } from '../templates/table';
import { TableCell } from '../templates/table-cell';
import { TableStubCell } from '../templates/table-stub-cell';
import { TableNoDataCell } from '../templates/table-no-data-cell';

const tableTemplate = tableRowComponentTemplate => props => (
  <Table
    tableRowComponentTemplate={tableRowComponentTemplate}
    {...props}
  />
);
const defaultCellTemplate = props => <TableCell {...props} />;
const stubCellTemplate = props => <TableStubCell {...props} />;
const noDataCellTemplate = props => <TableNoDataCell {...props} />;

export const TableView = ({ tableCellTemplate, tableRowComponentTemplate, ...props }) => (
  <TableViewBase
    tableTemplate={tableTemplate(tableRowComponentTemplate)}
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
  tableRowComponentTemplate: PropTypes.func,
};
TableView.defaultProps = {
  tableCellTemplate: undefined,
  tableRowComponentTemplate: undefined,
};

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
const emptyCellTemplate = props => <TableStubCell {...props} />;
const emptyHeaderCellTemplate = props => <TableStubHeaderCell {...props} />;
const noDataCellTemplate = props => <TableNoDataCell {...props} />;

export const TableView = ({ tableCellTemplate, ...props }) => (
  <TableViewBase
    tableTemplate={tableTemplate}
    tableCellTemplate={combineTemplates(
      tableCellTemplate,
      defaultCellTemplate,
    )}
    tableStubCellTemplate={emptyCellTemplate}
    tableStubHeaderCellTemplate={emptyHeaderCellTemplate}
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

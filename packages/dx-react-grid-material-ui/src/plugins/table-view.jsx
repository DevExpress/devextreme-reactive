import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableView as TableViewBase } from '@devexpress/dx-react-grid';
import { TableRow } from '../templates/table-row';
import { Table } from '../templates/table';
import { TableCell } from '../templates/table-cell';
import { TableStubCell } from '../templates/table-stub-cell';
import { TableNoDataCell } from '../templates/table-no-data-cell';

const tableLayoutTemplate = props => <Table {...props} />;
const defaultRowTemplate = props => <TableRow {...props} />;
const defaultNoDataRowTemplate = props => <TableRow {...props} />;
const defaultCellTemplate = props => <TableCell {...props} />;
const defaultStubCellTemplate = props => <TableStubCell {...props} />;
const defaultNoDataCellTemplate = props => <TableNoDataCell {...props} />;

export const TableView = ({
  tableCellTemplate,
  tableRowTemplate,
  tableNoDataRowTemplate,
  tableStubCellTemplate,
  tableStubHeaderCellTemplate,
  tableNoDataCellTemplate,
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
    tableStubCellTemplate={combineTemplates(
      tableStubCellTemplate,
      defaultStubCellTemplate,
    )}
    tableStubHeaderCellTemplate={combineTemplates(
      tableStubHeaderCellTemplate,
      defaultStubCellTemplate,
    )}
    tableNoDataCellTemplate={combineTemplates(
      tableNoDataCellTemplate,
      defaultNoDataCellTemplate,
    )}
    {...props}
  />
);
TableView.propTypes = {
  tableCellTemplate: PropTypes.func,
  tableRowTemplate: PropTypes.func,
  tableNoDataRowTemplate: PropTypes.func,
  tableStubCellTemplate: PropTypes.func,
  tableStubHeaderCellTemplate: PropTypes.func,
  tableNoDataCellTemplate: PropTypes.func,
};
TableView.defaultProps = {
  tableCellTemplate: undefined,
  tableRowTemplate: undefined,
  tableNoDataRowTemplate: undefined,
  tableStubCellTemplate: undefined,
  tableStubHeaderCellTemplate: undefined,
  tableNoDataCellTemplate: undefined,
};

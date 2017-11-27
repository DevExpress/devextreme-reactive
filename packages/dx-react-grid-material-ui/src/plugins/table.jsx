import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { Table as TableBase } from '@devexpress/dx-react-grid';
import { TableRow } from '../templates/table-row';
import { TableLayout } from '../templates/table-layout';
import { TableCell } from '../templates/table-cell';
import { TableStubCell } from '../templates/table-stub-cell';
import { TableNoDataCell } from '../templates/table-no-data-cell';

const tableLayoutTemplate = props => <TableLayout {...props} />;
const defaultRowTemplate = props => <TableRow {...props} />;
const defaultNoDataRowTemplate = props => <TableRow {...props} />;
const defaultCellTemplate = props => <TableCell {...props} />;
const defaultStubCellTemplate = props => <TableStubCell {...props} />;
const defaultNoDataCellTemplate = props => <TableNoDataCell {...props} />;

const defaultMessages = {
  noData: 'No data',
};

export class Table extends React.PureComponent {
  render() {
    const {
      tableCellTemplate,
      tableRowTemplate,
      tableNoDataRowTemplate,
      tableStubCellTemplate,
      tableStubHeaderCellTemplate,
      tableNoDataCellTemplate,
      messages,
      ...restProps
    } = this.props;

    return (
      <TableBase
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
        messages={{ ...defaultMessages, ...messages }}
        {...restProps}
      />
    );
  }
}

Table.Cell = TableCell;
Table.Row = TableRow;
Table.NoDataCell = TableNoDataCell;
Table.NoDataRow = TableRow;
Table.StubCell = TableStubCell;
Table.StubHeaderCell = TableStubCell;

Table.propTypes = {
  tableCellTemplate: PropTypes.func,
  tableRowTemplate: PropTypes.func,
  tableNoDataRowTemplate: PropTypes.func,
  tableStubCellTemplate: PropTypes.func,
  tableStubHeaderCellTemplate: PropTypes.func,
  tableNoDataCellTemplate: PropTypes.func,
  messages: PropTypes.shape({
    noData: PropTypes.string,
  }),
};

Table.defaultProps = {
  tableCellTemplate: undefined,
  tableRowTemplate: undefined,
  tableNoDataRowTemplate: undefined,
  tableStubCellTemplate: undefined,
  tableStubHeaderCellTemplate: undefined,
  tableNoDataCellTemplate: undefined,
  messages: {},
};

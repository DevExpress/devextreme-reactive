import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableView as TableViewBase } from '@devexpress/dx-react-grid';
import { TableLayout } from '../templates/table-layout';
import { TableCell } from '../templates/table-cell';
import { TableStubCell } from '../templates/table-stub-cell';
import { TableStubHeaderCell } from '../templates/table-stub-header-cell';
import { TableNoDataCell } from '../templates/table-no-data-cell';
import { TableRow } from '../templates/table-row';

const tableLayoutTemplate = props => <TableLayout {...props} />;
const defaultRowTemplate = props => <TableRow {...props} />;
const defaultNoDataRowTemplate = props => <TableRow {...props} />;
const defaultCellTemplate = props => <TableCell {...props} />;
const defaultStubCellTemplate = props => <TableStubCell {...props} />;
const defaultStubHeaderCellTemplate = props => <TableStubHeaderCell {...props} />;
const defaultNoDataCellTemplate = props => <TableNoDataCell {...props} />;

const defaultMessages = {
  noData: 'No data',
};

export class TableView extends React.PureComponent {
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
          defaultStubHeaderCellTemplate,
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

TableView.propTypes = {
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

TableView.defaultProps = {
  tableCellTemplate: undefined,
  tableRowTemplate: undefined,
  tableNoDataRowTemplate: undefined,
  tableStubCellTemplate: undefined,
  tableStubHeaderCellTemplate: undefined,
  tableNoDataCellTemplate: undefined,
  messages: {},
};

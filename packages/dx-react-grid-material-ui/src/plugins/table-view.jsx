import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableView as TableViewBase } from '@devexpress/dx-react-grid';
import { TableRow } from '../templates/table-row';
import { TableLayout } from '../templates/table-layout';
import { TableCell } from '../templates/table-cell';
import { TableStubCell } from '../templates/table-stub-cell';
import { TableNoDataCell } from '../templates/table-no-data-cell';

const defaultGetTableCellComponent = () => TableCell;

const defaultMessages = {
  noData: 'No data',
};

export class TableView extends React.PureComponent {
  render() {
    const {
      getTableCellComponent,
      messages,
      ...restProps
    } = this.props;

    return (
      <TableViewBase
        tableLayoutComponent={TableLayout}
        tableRowComponent={TableRow}
        getTableCellComponent={combineTemplates(
          getTableCellComponent,
          defaultGetTableCellComponent,
        )}
        tableNoDataRowComponent={TableRow}
        tableNoDataCellComponent={TableNoDataCell}
        tableStubCellComponent={TableStubCell}
        tableStubHeaderCellComponent={TableStubCell}
        messages={{ ...defaultMessages, ...messages }}
        {...restProps}
      />
    );
  }
}

TableView.propTypes = {
  getTableCellComponent: PropTypes.func,
  messages: PropTypes.shape({
    noData: PropTypes.string,
  }),
};

TableView.defaultProps = {
  getTableCellComponent: undefined,
  messages: {},
};

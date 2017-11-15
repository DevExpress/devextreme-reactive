import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableView as TableViewBase } from '@devexpress/dx-react-grid';
import { VirtualTableLayout } from '../templates/virtual-table-layout';
import { TableCell } from '../templates/table-cell';
import { TableRow } from '../templates/table-row';
import { TableNoDataCell } from '../templates/table-no-data-cell';
import { TableStubCell } from '../templates/table-stub-cell';
import { TableStubHeaderCell } from '../templates/table-stub-header-cell';

const defaultCellTemplate = props => <TableCell {...props} />;

const defaultMessages = {
  noData: 'No data',
};

export class VirtualTableView extends React.PureComponent {
  render() {
    const {
      tableCellTemplate,
      height,
      estimatedRowHeight,
      messages,
      ...restProps
    } = this.props;

    const TableLayout = props => (
      <VirtualTableLayout
        {...props}
        height={height}
        estimatedRowHeight={estimatedRowHeight}
      />
    );

    return (
      <TableViewBase
        tableLayoutComponent={TableLayout}
        tableRowComponent={TableRow}
        tableCellTemplate={combineTemplates(
          tableCellTemplate,
          defaultCellTemplate,
        )}
        tableNoDataRowComponent={TableRow}
        tableNoDataCellComponent={TableNoDataCell}
        tableStubCellComponent={TableStubCell}
        tableStubHeaderCellComponent={TableStubHeaderCell}
        messages={{ ...defaultMessages, ...messages }}
        {...restProps}
      />
    );
  }
}

VirtualTableView.propTypes = {
  tableCellTemplate: PropTypes.func,
  estimatedRowHeight: PropTypes.number,
  height: PropTypes.number,
  messages: PropTypes.shape({
    noData: PropTypes.string,
  }),
};

VirtualTableView.defaultProps = {
  tableCellTemplate: undefined,
  estimatedRowHeight: 37,
  height: 530,
  messages: {},
};

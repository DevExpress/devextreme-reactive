import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates, createRenderComponent } from '@devexpress/dx-react-core';
import { TableView as TableViewBase } from '@devexpress/dx-react-grid';
import { VirtualTableLayout } from '../templates/virtual-table-layout';
import { TableRow } from '../templates/table-row';
import { TableCell } from '../templates/table-cell';
import { TableStubCell } from '../templates/table-stub-cell';
import { TableNoDataCell } from '../templates/table-no-data-cell';

const defaultGetTableCellComponent = () => TableCell;

const defaultMessages = {
  noData: 'No data',
};

export class VirtualTableView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.tableLayoutRenderComponent = createRenderComponent();
  }
  render() {
    const {
      getTableCellComponent,
      height,
      estimatedRowHeight,
      messages,
      ...restProps
    } = this.props;

    return (
      <TableViewBase
        tableLayoutComponent={this.tableLayoutRenderComponent(props => (
          <VirtualTableLayout
            {...props}
            height={height}
            estimatedRowHeight={estimatedRowHeight}
          />
        ))}
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

VirtualTableView.propTypes = {
  getTableCellComponent: PropTypes.func,
  estimatedRowHeight: PropTypes.number,
  height: PropTypes.number,
  messages: PropTypes.shape({
    noData: PropTypes.string,
  }),
};

VirtualTableView.defaultProps = {
  getTableCellComponent: undefined,
  estimatedRowHeight: 48,
  height: 530,
  messages: {},
};

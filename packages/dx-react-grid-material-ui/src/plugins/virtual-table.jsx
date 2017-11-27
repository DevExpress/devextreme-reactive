import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates, createRenderComponent } from '@devexpress/dx-react-core';
import { Table as TableBase } from '@devexpress/dx-react-grid';
import { VirtualTableLayout } from '../templates/virtual-table-layout';
import { TableRow } from '../templates/table-row';
import { TableCell } from '../templates/table-cell';
import { TableStubCell } from '../templates/table-stub-cell';
import { TableNoDataCell } from '../templates/table-no-data-cell';

const defaultGetCellComponent = () => TableCell;

const defaultMessages = {
  noData: 'No data',
};

export class VirtualTable extends React.PureComponent {
  constructor(props) {
    super(props);

    this.layoutRenderComponent = createRenderComponent();
  }
  render() {
    const {
      getCellComponent,
      height,
      estimatedRowHeight,
      messages,
      ...restProps
    } = this.props;

    return (
      <TableBase
        layoutComponent={this.layoutRenderComponent(props => (
          <VirtualTableLayout
            {...props}
            height={height}
            estimatedRowHeight={estimatedRowHeight}
          />
        ))}
        rowComponent={TableRow}
        getCellComponent={combineTemplates(
          getCellComponent,
          defaultGetCellComponent,
        )}
        noDataRowComponent={TableRow}
        noDataCellComponent={TableNoDataCell}
        stubCellComponent={TableStubCell}
        stubHeaderCellComponent={TableStubCell}
        messages={{ ...defaultMessages, ...messages }}
        {...restProps}
      />
    );
  }
}

VirtualTable.propTypes = {
  getCellComponent: PropTypes.func,
  estimatedRowHeight: PropTypes.number,
  height: PropTypes.number,
  messages: PropTypes.shape({
    noData: PropTypes.string,
  }),
};

VirtualTable.defaultProps = {
  getCellComponent: undefined,
  estimatedRowHeight: 48,
  height: 530,
  messages: {},
};

import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { Table as TableBase } from '@devexpress/dx-react-grid';
import { VirtualTableLayout } from '../templates/virtual-table-layout';
import { TableCell } from '../templates/table-cell';
import { TableRow } from '../templates/table-row';
import { TableNoDataCell } from '../templates/table-no-data-cell';
import { TableStubCell } from '../templates/table-stub-cell';
import { TableStubHeaderCell } from '../templates/table-stub-header-cell';

const tableLayoutTemplate = props => <VirtualTableLayout {...props} />;
const defaultRowTemplate = props => <TableRow {...props} />;
const defaultNoDataRowTemplate = props => <TableRow {...props} />;
const defaultCellTemplate = props => <TableCell {...props} />;
const defaultStubCellTemplate = props => <TableStubCell {...props} />;
const defaultStubHeaderCellTemplate = props => <TableStubHeaderCell {...props} />;
const defaultNoDataCellTemplate = props => <TableNoDataCell {...props} />;

const defaultMessages = {
  noData: 'No data',
};

export class VirtualTable extends React.PureComponent {
  render() {
    const {
      tableCellTemplate,
      tableRowTemplate,
      tableNoDataRowTemplate,
      tableStubCellTemplate,
      tableStubHeaderCellTemplate,
      tableNoDataCellTemplate,
      height,
      estimatedRowHeight,
      messages,
      ...restProps
    } = this.props;

    return (
      <TableBase
        tableLayoutTemplate={props => tableLayoutTemplate({
          ...props,
          height,
          estimatedRowHeight,
        })}
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

VirtualTable.propTypes = {
  tableCellTemplate: PropTypes.func,
  tableRowTemplate: PropTypes.func,
  tableNoDataRowTemplate: PropTypes.func,
  tableStubCellTemplate: PropTypes.func,
  tableStubHeaderCellTemplate: PropTypes.func,
  tableNoDataCellTemplate: PropTypes.func,
  estimatedRowHeight: PropTypes.number,
  height: PropTypes.number,
  messages: PropTypes.shape({
    noData: PropTypes.string,
  }),
};

VirtualTable.defaultProps = {
  tableCellTemplate: undefined,
  tableRowTemplate: undefined,
  tableNoDataRowTemplate: undefined,
  tableStubCellTemplate: undefined,
  tableStubHeaderCellTemplate: undefined,
  tableNoDataCellTemplate: undefined,
  estimatedRowHeight: 37,
  height: 530,
  messages: {},
};

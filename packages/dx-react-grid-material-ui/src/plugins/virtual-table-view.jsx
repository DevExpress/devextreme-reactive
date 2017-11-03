import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableView as TableViewBase } from '@devexpress/dx-react-grid';
import { VirtualTableLayout } from '../templates/virtual-table-layout';
import { TableRow } from '../templates/table-row';
import { TableCell } from '../templates/table-cell';
import { TableStubCell } from '../templates/table-stub-cell';
import { TableNoDataCell } from '../templates/table-no-data-cell';

const tableLayoutTemplate = props => <VirtualTableLayout {...props} />;
const defaultRowTemplate = props => <TableRow {...props} />;
const defaultNoDataRowTemplate = props => <TableRow {...props} />;
const defaultCellTemplate = props => <TableCell {...props} />;
const defaultStubCellTemplate = props => <TableStubCell {...props} />;
const defaultNoDataCellTemplate = props => <TableNoDataCell {...props} />;

const defaultMessages = {
  noData: 'No data',
};

export class VirtualTableView extends React.PureComponent {
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
      <TableViewBase
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

VirtualTableView.propTypes = {
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

VirtualTableView.defaultProps = {
  tableCellTemplate: undefined,
  tableRowTemplate: undefined,
  tableNoDataRowTemplate: undefined,
  tableStubCellTemplate: undefined,
  tableStubHeaderCellTemplate: undefined,
  tableNoDataCellTemplate: undefined,
  estimatedRowHeight: 48,
  height: 530,
  messages: {},
};

import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableRowDetail as TableRowDetailBase } from '@devexpress/dx-react-grid';
import { TableDetailToggleCell } from '../templates/table-detail-toggle-cell';
import { TableDetailCell } from '../templates/table-detail-cell';
import { TableRow } from '../templates/table-row';

const defaultDetailToggleCellTemplate = props => <TableDetailToggleCell {...props} />;
const defaultDetailCellTemplate = props => <TableDetailCell {...props} />;
const defaultDetailRowTemplate = props => <TableRow {...props} />;

export class TableRowDetail extends React.PureComponent {
  render() {
    const {
      detailCellTemplate,
      detailRowTemplate,
      detailToggleCellTemplate,
      ...restProps
    } = this.props;

    return (
      <TableRowDetailBase
        detailToggleCellTemplate={combineTemplates(
          detailToggleCellTemplate,
          defaultDetailToggleCellTemplate,
        )}
        detailCellTemplate={combineTemplates(
          detailCellTemplate,
          defaultDetailCellTemplate,
        )}
        detailRowTemplate={combineTemplates(
          detailRowTemplate,
          defaultDetailRowTemplate,
        )}
        detailToggleCellWidth={38}
        {...restProps}
      />
    );
  }
}

TableRowDetail.propTypes = {
  detailRowTemplate: PropTypes.func,
  detailCellTemplate: PropTypes.func,
  detailToggleCellTemplate: PropTypes.func,
};

TableRowDetail.defaultProps = {
  detailRowTemplate: undefined,
  detailCellTemplate: undefined,
  detailToggleCellTemplate: undefined,
};

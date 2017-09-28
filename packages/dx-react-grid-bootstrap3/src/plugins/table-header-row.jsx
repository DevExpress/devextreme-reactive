import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableHeaderRow as TableHeaderRowBase } from '@devexpress/dx-react-grid';
import { TableHeaderCell } from '../templates/table-header-cell';
import { TableRow } from '../templates/table-row';

const defaultHeaderCellTemplate = props => <TableHeaderCell {...props} />;
const defaultHeaderRowTemplate = props => <TableRow {...props} />;

export class TableHeaderRow extends React.PureComponent {
  render() {
    const { headerCellTemplate, headerRowTemplate, ...restProps } = this.props;

    return (
      <TableHeaderRowBase
        headerCellTemplate={combineTemplates(
          headerCellTemplate,
          defaultHeaderCellTemplate,
        )}
        headerRowTemplate={combineTemplates(
          headerRowTemplate,
          defaultHeaderRowTemplate,
        )}
        {...restProps}
      />
    );
  }
}

TableHeaderRow.propTypes = {
  headerCellTemplate: PropTypes.func,
  headerRowTemplate: PropTypes.func,
};

TableHeaderRow.defaultProps = {
  headerCellTemplate: undefined,
  headerRowTemplate: undefined,
};

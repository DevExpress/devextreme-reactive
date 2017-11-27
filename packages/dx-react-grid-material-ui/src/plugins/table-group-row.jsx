import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableGroupRow as TableGroupRowBase } from '@devexpress/dx-react-grid';
import { TableGroupCell } from '../templates/table-group-row-cell';
import { TableRow } from '../templates/table-row';

const defaultGetGroupCellTemplate = () => TableGroupCell;

export class TableGroupRow extends React.PureComponent {
  render() {
    const { getGroupCellComponent, ...restProps } = this.props;

    return (
      <TableGroupRowBase
        getGroupCellComponent={combineTemplates(
          getGroupCellComponent,
          defaultGetGroupCellTemplate,
        )}
        groupRowComponent={TableRow}
        groupIndentColumnWidth={48}
        {...restProps}
      />
    );
  }
}

TableGroupRow.propTypes = {
  getGroupCellComponent: PropTypes.func,
};

TableGroupRow.defaultProps = {
  getGroupCellComponent: undefined,
};


import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Plugin } from '@devexpress/dx-react-core';
import { filteredRows, getColumnExtension } from '@devexpress/dx-grid-core';

export class IntegratedFiltering extends React.PureComponent {
  render() {
    const { columnExtensions } = this.props;
    const getColumnPredicate = columnName =>
      getColumnExtension(columnExtensions, columnName).predicate;

    const rowsComputed = ({
      rows,
      filterExpr,
      getCellValue,
      isGroupRow,
      getRowLevelKey,
    }) => filteredRows(
      rows,
      filterExpr,
      getCellValue,
      getColumnPredicate,
      isGroupRow,
      getRowLevelKey,
    );

    return (
      <Plugin
        name="IntegratedFiltering"
      >
        <Getter name="rows" computed={rowsComputed} />
      </Plugin>
    );
  }
}

IntegratedFiltering.propTypes = {
  columnExtensions: PropTypes.array,
};

IntegratedFiltering.defaultProps = {
  columnExtensions: undefined,
};

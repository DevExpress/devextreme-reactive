import * as React from 'react';
import PropTypes from 'prop-types';
import { TableColumnResizing as TableColumnResizingBase } from '@devexpress/dx-react-grid';

export class TableColumnResizing extends React.PureComponent {
  render() {
    const { minColumnWidth, maxColumnWidth, ...restProps } = this.props;
    return (
      <TableColumnResizingBase
        {...restProps}
        minColumnWidth={minColumnWidth}
        maxColumnWidth={maxColumnWidth}
      />
    );
  }
}

TableColumnResizing.propTypes = {
  minColumnWidth: PropTypes.number,
  maxColumnWidth: PropTypes.number,
};

TableColumnResizing.defaultProps = {
  minColumnWidth: 40,
  maxColumnWidth: Infinity,
};

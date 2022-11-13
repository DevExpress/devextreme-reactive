import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleContext } from '../layout';

export class Cell extends React.PureComponent {
  render() {
    const {
      style, column, value, children,
      tableRow, tableColumn, row, beforeBorder,
      forwardedRef,
      ...restProps
    } = this.props;
    const { borderColor } = this.context;

    return (
      <th
        ref={forwardedRef}
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          borderTop: 'none',
          borderBottom: `1px solid ${borderColor}`,
          borderRight: `1px solid ${borderColor}`,
          ...beforeBorder ? { borderLeft: `1px solid ${borderColor}` } : null,
          ...style,
        }}
        {...restProps}
      >
        {children}
      </th>
    );
  }
}

Cell.contextType = StyleContext;

Cell.propTypes = {
  style: PropTypes.object,
  value: PropTypes.any,
  column: PropTypes.object,
  row: PropTypes.any,
  children: PropTypes.node,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  beforeBorder: PropTypes.bool,
  forwardedRef: PropTypes.func,
};

Cell.defaultProps = {
  style: null,
  value: undefined,
  column: undefined,
  row: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  beforeBorder: false,
  forwardedRef: undefined,
};

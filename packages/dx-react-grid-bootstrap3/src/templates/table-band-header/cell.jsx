/* globals window:true */

import * as React from 'react';
import * as PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

export class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = { borderColor: undefined };
  }

  componentDidMount() {
    const { borderColor: stateBorderColor } = this.state;
    if (!stateBorderColor) {
      // eslint-disable-next-line react/no-find-dom-node
      this.setState({ borderColor: window.getComputedStyle(findDOMNode(this)).borderBottomColor });
    }
  }

  render() {
    const {
      style, column, value, children,
      tableRow, tableColumn, row, beforeBorder,
      ...restProps
    } = this.props;
    const { borderColor } = this.state;

    return (
      <th
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

Cell.propTypes = {
  style: PropTypes.object,
  value: PropTypes.any,
  column: PropTypes.object,
  row: PropTypes.any,
  children: PropTypes.node,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  beforeBorder: PropTypes.bool,
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
};

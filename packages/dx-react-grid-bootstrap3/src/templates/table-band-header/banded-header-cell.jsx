/* globals window:true */

import * as React from 'react';
import * as PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

let borderColor;

export class BandedHeaderCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = { borderColor };
  }

  componentDidMount() {
    const { borderColor: stateBorderColor } = this.state;
    if (!stateBorderColor) {
      // eslint-disable-next-line react/no-find-dom-node
      borderColor = window.getComputedStyle(findDOMNode(this)).borderBottomColor;
      this.setState({ borderColor });
    }
  }

  render() {
    const {
      component: HeaderCellComponent,
      style,
      ...restProps
    } = this.props;

    return (
      <HeaderCellComponent
        style={{
          borderTop: 'none',
          ...borderColor ? { borderRight: `1px solid ${borderColor}` } : null,
          ...style,
        }}
        {...restProps}
      />
    );
  }
}

BandedHeaderCell.propTypes = {
  component: PropTypes.func.isRequired,
  style: PropTypes.object,
};

BandedHeaderCell.defaultProps = {
  style: null,
};

/* globals window:true */

import * as React from 'react';
import * as PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

export class BandedHeaderCell extends React.Component {
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
      component: HeaderCellComponent,
      style, beforeBorder,
      ...restProps
    } = this.props;
    const { borderColor } = this.state;

    return (
      <HeaderCellComponent
        style={{
          borderTop: 'none',
          ...borderColor
            ? {
              borderRight: `1px solid ${borderColor}`,
              ...beforeBorder ? { borderLeft: `1px solid ${borderColor}` } : null,
            } : null,
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
  beforeBorder: PropTypes.bool,
};

BandedHeaderCell.defaultProps = {
  style: null,
  beforeBorder: false,
};

/* globals document:true window:true */

import * as React from 'react';
import * as PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

let borderColor;

export class FixedCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: 'white',
      borderColor,
    };
  }

  componentDidMount() {
    const {
      backgroundColor: stateBackgroundColor,
      borderColor: stateBorderColor,
    } = this.state;
    const body = document.getElementsByTagName('body')[0];
    const { backgroundColor } = window.getComputedStyle(body);
    if (!borderColor) {
      // eslint-disable-next-line react/no-find-dom-node
      borderColor = window.getComputedStyle(findDOMNode(this)).borderBottomColor;
    }
    if (stateBackgroundColor !== backgroundColor || !stateBorderColor) {
      this.setState({ backgroundColor, borderColor });
    }
  }

  render() {
    const {
      component: CellPlaceholder,
      side,
      showLeftDivider,
      showRightDivider,
      style,
      position,
      ...restProps
    } = this.props;
    const { backgroundColor } = this.state;

    return (
      <CellPlaceholder
        style={{
          ...style,
          position: 'sticky',
          zIndex: 300,
          backgroundColor,
          [side]: position,
          ...borderColor ? {
            ...showLeftDivider ? { borderLeft: `1px solid ${borderColor}` } : null,
            ...showRightDivider ? { borderRight: `1px solid ${borderColor}` } : null,
          } : null,
        }}
        {...restProps}
      />
    );
  }
}

FixedCell.propTypes = {
  style: PropTypes.object,
  component: PropTypes.func.isRequired,
  side: PropTypes.string.isRequired,
  position: PropTypes.number,
  showLeftDivider: PropTypes.bool,
  showRightDivider: PropTypes.bool,
};

FixedCell.defaultProps = {
  style: null,
  showLeftDivider: false,
  showRightDivider: false,
  position: undefined,
};

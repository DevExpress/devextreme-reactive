/* globals document:true window:true */

import * as React from 'react';
import * as PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

export class FixedCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: 'white',
      borderColor: '#ddd',
    };
  }

  componentDidMount() {
    const { storeSize } = this.props;
    // eslint-disable-next-line react/no-find-dom-node
    const element = findDOMNode(this);
    if (element) {
      storeSize(element.getBoundingClientRect().width);
    }

    const { backgroundColor: stateBackgroundColor } = this.state;
    const body = document.getElementsByTagName('body')[0];
    const { backgroundColor } = window.getComputedStyle(body);
    if (stateBackgroundColor !== backgroundColor) {
      this.setState({ backgroundColor });
    }
  }

  render() {
    const {
      component: CellPlaceholder,
      side,
      showLeftDivider,
      showRightDivider,
      style,
      getPosition,
      storeSize,
      ...restProps
    } = this.props;
    const { backgroundColor, borderColor } = this.state;

    return (
      <CellPlaceholder
        style={{
          ...style,
          position: 'sticky',
          zIndex: 500,
          backgroundColor,
          [side]: getPosition(),
          ...showLeftDivider ? { borderLeft: `1px solid ${borderColor}` } : null,
          ...showRightDivider ? { borderRight: `1px solid ${borderColor}` } : null,
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
  storeSize: PropTypes.func.isRequired,
  getPosition: PropTypes.func.isRequired,
  showLeftDivider: PropTypes.bool,
  showRightDivider: PropTypes.bool,
};

FixedCell.defaultProps = {
  style: {},
  showLeftDivider: false,
  showRightDivider: false,
};

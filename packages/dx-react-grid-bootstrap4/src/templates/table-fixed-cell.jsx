/* globals document:true window:true */

import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export class FixedCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { backgroundColor: 'white' };
  }

  componentDidMount() {
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
      className,
      style,
      position,
      ...restProps
    } = this.props;
    const { backgroundColor } = this.state;

    return (
      <CellPlaceholder
        className={classNames({
          'position-sticky': true,
          'dx-g-bs4-fixed-cell': true,
          'border-left': showLeftDivider,
          'border-right': showRightDivider,
        }, className)}
        style={{
          ...style,
          backgroundColor,
          [side]: position,
        }}
        {...restProps}
      />
    );
  }
}

FixedCell.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  component: PropTypes.func.isRequired,
  side: PropTypes.string.isRequired,
  position: PropTypes.number,
  showLeftDivider: PropTypes.bool,
  showRightDivider: PropTypes.bool,
};

FixedCell.defaultProps = {
  className: undefined,
  style: null,
  showLeftDivider: false,
  showRightDivider: false,
  position: undefined,
};

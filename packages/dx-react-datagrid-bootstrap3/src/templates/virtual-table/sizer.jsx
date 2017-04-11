/* global requestAnimationFrame cancelAnimationFrame */

import React from 'react';

export class Sizer extends React.Component {
  componentDidMount() {
    const watchSizes = () => {
      const rect = this.root.getBoundingClientRect();
      this.sizeUpdated(rect.width, rect.height);
      this._raf = requestAnimationFrame(watchSizes);
    };
    watchSizes();
  }
  componentWillUnmount() {
    cancelAnimationFrame(this._raf);
  }
  sizeUpdated(newWidth, newHeight) {
    const { height, onHeightChange, width, onWidthChange } = this.props;

    if (height !== undefined && newHeight !== height) {
      onHeightChange(newHeight);
    }
    if (width !== undefined && newWidth !== width) {
      onWidthChange(newWidth);
    }
  }
  render() {
    const { children, height, onHeightChange, width, onWidthChange, ...restProps } = this.props;

    return (
      <div ref={(ref) => { this.root = ref; }} {...restProps}>
        {children}
      </div>
    );
  }
}
Sizer.defaultProps = {
  height: undefined,
  onHeightChange: () => {},
  width: undefined,
  onWidthChange: () => {},
};
Sizer.propTypes = {
  height: React.PropTypes.number,
  onHeightChange: React.PropTypes.func,
  width: React.PropTypes.number,
  onWidthChange: React.PropTypes.func,
  children: React.PropTypes.oneOfType([
    React.PropTypes.node,
    React.PropTypes.arrayOf(React.PropTypes.node),
  ]).isRequired,
};

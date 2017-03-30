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
    const { height, onHeightChange } = this.props;

    if (newHeight !== height) {
      onHeightChange(newHeight);
    }
  }
  render() {
    const { children } = this.props;

    return (
      <div ref={(ref) => { this.root = ref; }}>
        {children}
      </div>
    );
  }
}
Sizer.propTypes = {
  height: React.PropTypes.number.isRequired,
  onHeightChange: React.PropTypes.func.isRequired,
  children: React.PropTypes.oneOfType([
    React.PropTypes.node,
    React.PropTypes.arrayOf(React.PropTypes.node),
  ]).isRequired,
};

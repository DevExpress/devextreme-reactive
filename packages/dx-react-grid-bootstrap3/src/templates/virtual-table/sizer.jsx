import React from 'react';
import PropTypes from 'prop-types';

export class Sizer extends React.Component {
  componentDidMount() {
    const watchSizes = () => {
      const rect = this.root.getBoundingClientRect();
      this.sizeUpdated(rect.width, rect.height);
      // eslint-disable-next-line no-undef
      this.raf = requestAnimationFrame(watchSizes);
    };
    watchSizes();
  }
  componentWillUnmount() {
    // eslint-disable-next-line no-undef
    cancelAnimationFrame(this.raf);
  }
  sizeUpdated(newWidth, newHeight) {
    const {
      height, onHeightChange, width, onWidthChange,
    } = this.props;

    if (height !== undefined && newHeight !== height) {
      onHeightChange(newHeight);
    }
    if (width !== undefined && newWidth !== width) {
      onWidthChange(newWidth);
    }
  }
  render() {
    const {
      children, height, onHeightChange, width, onWidthChange, ...restProps
    } = this.props;

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
  height: PropTypes.number,
  onHeightChange: PropTypes.func,
  width: PropTypes.number,
  onWidthChange: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

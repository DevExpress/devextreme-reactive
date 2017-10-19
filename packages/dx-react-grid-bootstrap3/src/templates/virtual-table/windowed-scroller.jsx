import React from 'react';
import PropTypes from 'prop-types';
import { Sizer } from './sizer';

let isSafari;

export class WindowedScroller extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        top: 0, left: 0, width: 0, height: 0,
      },
      offsetWidth: 0,
    };

    this.updateViewport = this.updateViewport.bind(this);
  }

  getChildContext() {
    return {
      virtualHost: {
        viewport: this.state.viewport,
      },
    };
  }

  componentDidMount() {
    if (isSafari === undefined) {
      // eslint-disable-next-line no-undef
      isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
    }
    setTimeout(() => {
      this.updateViewport();
    });
  }

  updateViewport() {
    if (isSafari) {
      // eslint-disable-next-line no-undef
      requestAnimationFrame(this._updateViewport.bind(this));
    } else {
      this._updateViewport();
    }
  }

  _updateViewport() {
    if (!this.root) return;

    const oldViewport = this.state.viewport;
    const viewport = {
      top: this.root.scrollTop,
      left: this.root.scrollLeft,
      width: this.root.clientWidth,
      height: this.root.clientHeight,
    };

    // Prevent iOS to flicker in bounces =(
    if (
      viewport.top < 0 ||
      viewport.left < 0 ||
      viewport.left + viewport.width > this.root.scrollWidth ||
      viewport.top + viewport.height > this.root.scrollHeight) {
      return;
    }

    // Optimize performance
    if (oldViewport.top !== viewport.top ||
      oldViewport.left !== viewport.left ||
      oldViewport.width !== viewport.width ||
      oldViewport.height !== viewport.height) {
      this.setState({ viewport });
      this.props.onViewportChange(viewport);
    }
  }

  render() {
    return (
      <Sizer
        style={{ width: '100%', height: '100%' }}
        width={this.state.offsetWidth}
        onWidthChange={(width) => {
          this.setState({ offsetWidth: width });
          this.updateViewport();
        }}
      >
        <div
          ref={(ref) => { this.root = ref; }}
          onScroll={this.updateViewport}
          style={{
            overflow: 'auto',
            width: '100%',
            height: '100%',
            WebkitOverflowScrolling: 'touch',
            willChange: 'scroll-position',
          }}
        >
          {this.props.children}
        </div>
      </Sizer>
    );
  }
}
WindowedScroller.defaultProps = {
  onViewportChange: () => {},
};
WindowedScroller.propTypes = {
  onViewportChange: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};
WindowedScroller.childContextTypes = {
  virtualHost: PropTypes.object.isRequired,
};

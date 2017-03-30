/* global navigator requestAnimationFrame */

import React from 'react';

const isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

export class WindowedScroller extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewport: { top: 0, left: 0, width: 0, height: 0 },
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
    setTimeout(() => {
      this.updateViewport();
    });
  }

  updateViewport() {
    if (isSafari) {
      requestAnimationFrame(this._updateViewport.bind(this));
    } else {
      this._updateViewport();
    }
  }

  _updateViewport() {
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
    }
  }

  render() {
    return (
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
    );
  }
}
WindowedScroller.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.node,
    React.PropTypes.arrayOf(React.PropTypes.node),
  ]).isRequired,
};
WindowedScroller.childContextTypes = {
  virtualHost: React.PropTypes.object.isRequired,
};

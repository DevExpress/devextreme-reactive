/* globals window:true */

import React from 'react';
import PropTypes from 'prop-types';

const BOUNDARY = 1;
const clamp = (value, min, max) => Math.max(Math.min(value, max), min);

export class Draggable extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.initialOffset = null;
    this.offset = null;

    this.isBoundExceeded = ({ x, y }) =>
      clamp(x, this.initialOffset.x - BOUNDARY, this.initialOffset.x + BOUNDARY) !== x ||
      clamp(y, this.initialOffset.y - BOUNDARY, this.initialOffset.y + BOUNDARY) !== y;
    this.onStart = ({ x, y }) => {
      this.initialOffset = { x, y };
      this.installListeners();
    };
    this.onMove = ({ x, y, prevent }) => {
      if (this.initialOffset && this.isBoundExceeded({ x, y })) {
        prevent();
        if (window.getSelection) {
          window.getSelection().removeAllRanges();
        }
        const offset = { x, y };
        if (!this.offset) {
          this.props.onStart(this.initialOffset);
        } else {
          this.props.onUpdate(offset);
        }
        this.offset = offset;
      }
    };
    this.onEnd = ({ x, y, prevent }) => {
      if (this.offset) {
        prevent();
        this.props.onEnd({ x, y });
      }
      this.initialOffset = null;
      this.offset = null;
      this.removeListeners();
    };

    this.listeners = [
      ['mousemove', (e) => {
        const { clientX, clientY } = e;
        this.onMove({ x: clientX, y: clientY, prevent: () => e.preventDefault() });
      }],
      ['mouseup', (e) => {
        const { clientX, clientY } = e;
        this.onEnd({ x: clientX, y: clientY, prevent: () => e.preventDefault() });
      }],
      ['touchmove', (e) => {
        const { clientX, clientY } = e.touches[0];
        this.onMove({ x: clientX, y: clientY, prevent: () => e.preventDefault() });
      }, { passive: false }],
      ['touchend', (e) => {
        const { clientX, clientY } = e.changedTouches[0];
        this.onEnd({ x: clientX, y: clientY, prevent: () => e.preventDefault() });
      }],
    ];
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.children !== this.props.children;
  }
  installListeners() {
    this.listeners.forEach(args => window.addEventListener(...args));
  }
  removeListeners() {
    this.listeners.forEach(args => window.removeEventListener(...args));
  }
  render() {
    return React.cloneElement(
      React.Children.only(this.props.children),
      {
        onMouseDown: (e) => {
          const { clientX, clientY, currentTarget } = e;
          this.onStart({ target: currentTarget, x: clientX, y: clientY });
        },
        onTouchStart: (e) => {
          const { currentTarget } = e;
          const { clientX, clientY } = e.touches[0];
          this.onStart({ target: currentTarget, x: clientX, y: clientY });
        },
      },
    );
  }
}

Draggable.propTypes = {
  children: PropTypes.node.isRequired,
  onStart: PropTypes.func,
  onUpdate: PropTypes.func,
  onEnd: PropTypes.func,
};

Draggable.defaultProps = {
  onStart: () => {},
  onUpdate: () => {},
  onEnd: () => {},
};

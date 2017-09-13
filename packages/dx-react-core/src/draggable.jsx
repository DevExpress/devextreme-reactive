import React from 'react';
import PropTypes from 'prop-types';

import { TouchStrategy } from './draggable/touch-strategy';
import { MouseStrategy } from './draggable/mouse-strategy';
import { getSharedEventEmitter, touchEventsSupported } from './draggable/shared-events';

export class Draggable extends React.Component {
  constructor(props, context) {
    super(props, context);

    const delegate = {
      onStart: ({ x, y }) => {
        this.props.onStart({ x, y });
      },
      onMove: ({ x, y }) => {
        this.props.onUpdate({ x, y });
      },
      onEnd: ({ x, y }) => {
        this.props.onEnd({ x, y });
      },
    };

    this.mouseStrategy = new MouseStrategy(delegate);
    this.touchStrategy = new TouchStrategy(delegate);

    this.listener = this.listener.bind(this);
  }
  componentDidMount() {
    getSharedEventEmitter().subscribe(this.listener);
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.children !== this.props.children;
  }
  componentWillUnmount() {
    getSharedEventEmitter().unsubscribe(this.listener);
  }
  listener([name, e]) {
    switch (name) {
      case 'mousemove':
        this.mouseStrategy.move(e);
        break;
      case 'mouseup':
        this.mouseStrategy.end(e);
        break;
      case 'touchmove': {
        this.touchStrategy.move(e);
        break;
      }
      case 'touchend':
      case 'touchcancel': {
        this.touchStrategy.end(e);
        break;
      }
      default:
        break;
    }
  }
  render() {
    return React.cloneElement(
      React.Children.only(this.props.children),
      {
        onMouseDown: (e) => {
          if (touchEventsSupported()) return;
          this.mouseStrategy.start(e);
          e.stopPropagation();
        },
        onTouchStart: (e) => {
          this.touchStrategy.start(e);
          e.stopPropagation();
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

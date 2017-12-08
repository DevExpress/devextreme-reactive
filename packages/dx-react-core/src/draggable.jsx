import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line camelcase
import { unstable_batchedUpdates } from 'react-dom';
import { TouchStrategy } from './draggable/touch-strategy';
import { MouseStrategy } from './draggable/mouse-strategy';
import { getSharedEventEmitter } from './draggable/shared-events';

export class Draggable extends React.Component {
  constructor(props, context) {
    super(props, context);

    const delegate = {
      onStart: ({ x, y }) => {
        const { onStart } = this.props;
        if (!onStart) return;
        unstable_batchedUpdates(() => {
          onStart({ x, y });
        });
      },
      onMove: ({ x, y }) => {
        const { onUpdate } = this.props;
        if (!onUpdate) return;
        unstable_batchedUpdates(() => {
          onUpdate({ x, y });
        });
      },
      onEnd: ({ x, y }) => {
        const { onEnd } = this.props;
        if (!onEnd) return;
        unstable_batchedUpdates(() => {
          onEnd({ x, y });
        });
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
          if (this.touchStrategy.isWaiting()) return;
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
  onStart: undefined,
  onUpdate: undefined,
  onEnd: undefined,
};

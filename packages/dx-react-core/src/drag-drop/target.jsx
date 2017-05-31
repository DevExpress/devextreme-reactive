import React from 'react';
import PropTypes from 'prop-types';

const clamp = (value, min, max) => Math.max(Math.min(value, max), min);

export class DropTarget extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.node = null;
    this.isOver = false;

    this.handleDrag = this.handleDrag.bind(this);
  }
  componentWillMount() {
    const { dragDropContext: { dragEmitter } } = this.context;
    dragEmitter.subscribe(this.handleDrag);
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.children !== this.props.children;
  }
  componentWillUnmount() {
    const { dragDropContext: { dragEmitter } } = this.context;
    dragEmitter.unsubscribe(this.handleDrag);
  }
  handleDrag({ item, clientOffset, drop }) {
    const { left, top, right, bottom } = this.node.getBoundingClientRect();
    const isOver = clientOffset
      && clamp(clientOffset.x, left, right) === clientOffset.x
      && clamp(clientOffset.y, top, bottom) === clientOffset.y;

    if (!this.isOver && isOver) this.props.onEnter(item, clientOffset);
    if (this.isOver && isOver) this.props.onOver(item, clientOffset);
    if (this.isOver && !isOver) {
      if (drop) {
        this.props.onDrop(item);
      } else {
        this.props.onLeave(item);
      }
    }

    this.isOver = isOver;
  }
  render() {
    const { children } = this.props;
    return React.cloneElement(
      React.Children.only(children),
      {
        ref: (node) => {
          if (node) this.node = node;
          if (typeof children.ref === 'function') children.ref(node);
        },
      },
    );
  }
}

DropTarget.contextTypes = {
  dragDropContext: PropTypes.shape().isRequired,
};

DropTarget.propTypes = {
  children: PropTypes.node.isRequired,
  onEnter: PropTypes.func,
  onOver: PropTypes.func,
  onLeave: PropTypes.func,
  onDrop: PropTypes.func,
};

DropTarget.defaultProps = {
  onEnter: () => {},
  onOver: () => {},
  onLeave: () => {},
  onDrop: () => {},
};

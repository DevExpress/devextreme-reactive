import React from 'react';
import { findDOMNode } from 'react-dom';
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
  handleDrag({ payload, clientOffset, end }) {
    // eslint-disable-next-line react/no-find-dom-node
    const { left, top, right, bottom } = findDOMNode(this).getBoundingClientRect();
    const isOver = clientOffset
      && clamp(clientOffset.x, left, right) === clientOffset.x
      && clamp(clientOffset.y, top, bottom) === clientOffset.y;

    if (!this.isOver && isOver) this.props.onEnter({ payload, clientOffset });
    if (this.isOver && isOver) this.props.onOver({ payload, clientOffset });
    if (this.isOver && !isOver) this.props.onLeave({ payload, clientOffset });
    if (isOver && end) this.props.onDrop({ payload, clientOffset });

    this.isOver = isOver && !end;
  }
  render() {
    const { children } = this.props;
    return React.Children.only(children);
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

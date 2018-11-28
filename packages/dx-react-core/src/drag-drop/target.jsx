import * as React from 'react';
import { findDOMNode } from 'react-dom';
import * as PropTypes from 'prop-types';
import { DragDropContext } from './context';

const clamp = (value, min, max) => Math.max(Math.min(value, max), min);

export class DropTarget extends React.Component {
  constructor(props) {
    super(props);

    this.node = null;
    this.isOver = false;

    this.handleDrag = this.handleDrag.bind(this);
  }

  componentDidMount() {
    const { dragEmitter } = this.context;
    dragEmitter.subscribe(this.handleDrag);
  }

  shouldComponentUpdate(nextProps) {
    const { children } = this.props;
    return nextProps.children !== children;
  }

  componentWillUnmount() {
    const { dragEmitter } = this.context;
    dragEmitter.unsubscribe(this.handleDrag);
  }

  handleDrag({ payload, clientOffset, end }) {
    const {
      left,
      top,
      right,
      bottom,
    } = findDOMNode(this).getBoundingClientRect(); // eslint-disable-line react/no-find-dom-node
    const {
      onDrop, onEnter, onLeave, onOver,
    } = this.props;
    const isOver = clientOffset
      && clamp(clientOffset.x, left, right) === clientOffset.x
      && clamp(clientOffset.y, top, bottom) === clientOffset.y;

    if (!this.isOver && isOver) onEnter({ payload, clientOffset });
    if (this.isOver && isOver) onOver({ payload, clientOffset });
    if (this.isOver && !isOver) onLeave({ payload, clientOffset });
    if (isOver && end) onDrop({ payload, clientOffset });

    this.isOver = isOver && !end;
  }

  render() {
    const { children } = this.props;
    return React.Children.only(children);
  }
}

DropTarget.contextType = DragDropContext;

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

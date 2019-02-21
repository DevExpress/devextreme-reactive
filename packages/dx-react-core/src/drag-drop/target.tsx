import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { DragDropContext } from './context';

const clamp = (value, min, max) => Math.max(Math.min(value, max), min);

const defaultProps = {
  onEnter: (args) => {},
  onOver: (args) => {},
  onLeave: (args) => {},
  onDrop: (args) => {},
  sourcePayload: {},
};
type DropTargetDefaultProps = Readonly<typeof defaultProps>;

/** @internal */
export class DropTarget extends React.Component<DropTargetDefaultProps> {
  static defaultProps = defaultProps;
  isOver: boolean;

  constructor(props) {
    super(props);

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
    const { sourcePayload } = this.props;
    const dragDropContext = this.context;
    const {
      left,
      top,
      right,
      bottom,
    } = (findDOMNode(this) as Element).getBoundingClientRect();
    const {
      onDrop, onEnter, onLeave, onOver,
    } = this.props;
    const isOver = clientOffset
      && clamp(clientOffset.x, left, right - 1) === clientOffset.x // "-1" fix bug with double over
      && clamp(clientOffset.y, top, bottom - 1) === clientOffset.y; // in scheduler table cells

    if (!this.isOver && isOver) {
      onEnter({ payload, clientOffset });
      dragDropContext.addSource(sourcePayload, clientOffset);
    }
    if (this.isOver && isOver) { onOver({ payload, clientOffset }); }
    if (this.isOver && !isOver) {
      onLeave({ payload, clientOffset });
      dragDropContext.removeSource(sourcePayload, clientOffset);
    }
    if (isOver && end) onDrop({ payload, clientOffset });

    this.isOver = isOver && !end;
  }

  render() {
    const { children } = this.props;
    return React.Children.only(children);
  }
}

DropTarget.contextType = DragDropContext;

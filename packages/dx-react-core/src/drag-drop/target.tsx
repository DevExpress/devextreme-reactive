import * as React from 'react';
import { RefHolder } from '../ref-holder';
import { DragDropContext } from './context';

const clamp = (value, min, max) => Math.max(Math.min(value, max), min);

const defaultProps = {
  onEnter: (args) => {},
  onOver: (args) => {},
  onLeave: (args) => {},
  onDrop: (args) => {},
};
type DropTargetDefaultProps = Readonly<typeof defaultProps>;

/** @internal */
export class DropTarget extends React.Component<DropTargetDefaultProps> {
  static defaultProps = defaultProps;
  isOver: boolean;
  elementRef: React.RefObject<Element>;

  constructor(props) {
    super(props);

    this.isOver = false;

    this.handleDrag = this.handleDrag.bind(this);

    this.elementRef = React.createRef();
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
    } = this.elementRef.current!.getBoundingClientRect();
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
    return <RefHolder ref={this.elementRef}>{React.Children.only(children)}</RefHolder>;
  }
}

DropTarget.contextType = DragDropContext;

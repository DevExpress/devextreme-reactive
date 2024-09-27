import * as React from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { TouchStrategy } from './draggable/touch-strategy';
import { MouseStrategy } from './draggable/mouse-strategy';
import { getSharedEventEmitter } from './draggable/shared-events';
import { clear } from './draggable/selection-utils';
import { RefHolder } from './ref-holder';

const draggingHandled = Symbol('draggingHandled');

type DraggableProps = {
  onStart?: (args) => void;
  onUpdate?: (args) => void;
  onEnd?: (args) => void;
  dragItem?: React.MutableRefObject<any> | React.RefCallback<any> | null;
};

/** @internal */
export class Draggable extends React.PureComponent<DraggableProps> {
  mouseStrategy: MouseStrategy;
  touchStrategy: TouchStrategy;
  elementRef: React.MutableRefObject<Element | null>;
  eventParams: { e: any, isMouseEvent: boolean } | null = null;
  detachNodeEvents: any = null;

  constructor(props) {
    super(props);
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
    this.elementRef = React.createRef();

    this.mouseDownListener = this.mouseDownListener.bind(this);
    this.touchStartListener = this.touchStartListener.bind(this);
    this.globalListener = this.globalListener.bind(this);
  }

  componentDidMount() {
    getSharedEventEmitter().subscribe(this.globalListener);
    this.setupNodeSubscription();
  }

  componentDidUpdate() {
    this.setupNodeSubscription();
  }

  componentWillUnmount() {
    if (this.eventParams) {
      const { isMouseEvent, e } = this.eventParams;
      if (isMouseEvent) {
        this.mouseStrategy.end(e);
      } else {
        this.touchStrategy.end(e);
      }
      this.eventParams = null;
    }
    this.detachNodeEvents?.();
    getSharedEventEmitter().unsubscribe(this.globalListener);
  }

  setupNodeSubscription() {
    const node = this.elementRef.current;
    if (!node) return;
    this.detachNodeEvents?.();
    node.addEventListener('mousedown', this.mouseDownListener);
    node.addEventListener('touchstart', this.touchStartListener, { passive: true });
    this.detachNodeEvents = () => {
      node.removeEventListener('mousedown', this.mouseDownListener);
      node.removeEventListener('touchstart', this.touchStartListener);
    };
  }

  mouseDownListener(e) {
    if (this.touchStrategy.isWaiting() || e[draggingHandled]) return;
    e.preventDefault();
    this.mouseStrategy.start(e);
    e[draggingHandled] = true;
  }

  touchStartListener(e) {
    if (e[draggingHandled]) return;
    this.touchStrategy.start(e);
    e[draggingHandled] = true;
  }

  saveEvent(e, isMouseEvent) {
    this.eventParams = {
      e,
      isMouseEvent,
    };
  }

  globalListener([name, e]) {
    switch (name) {
      case 'mousemove':
        this.saveEvent(e, true);
        this.mouseStrategy.move(e);
        break;
      case 'contextmenu':
      case 'mouseup':
        this.eventParams = null;
        this.mouseStrategy.end(e);
        break;
      case 'touchmove': {
        this.saveEvent(e, false);
        this.touchStrategy.move(e);
        break;
      }
      case 'touchend':
      case 'touchcancel': {
        this.eventParams = null;
        this.touchStrategy.end(e);
        break;
      }
      default:
        break;
    }
    if (this.mouseStrategy.isDragging() || this.touchStrategy.isDragging()) {
      clear();
    }
  }

  render() {
    const { children, dragItem } = this.props;
    return <RefHolder
      ref={(node: Element | null) => {
        this.elementRef.current = node;
        if (typeof dragItem === 'function') {
          dragItem(node);
        } else if (dragItem) {
          dragItem.current = node;
        }
      }}
    >
      {children}
    </RefHolder>;
  }
}

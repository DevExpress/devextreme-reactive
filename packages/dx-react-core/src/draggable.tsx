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
  eventParams: { e?: any, name?: string } = {};

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
    const { name, e } = this.eventParams;
    if (name) {
      if (name.includes('mouse')) {
        this.mouseStrategy.end(e);
      } else if (name.includes('touch')) {
        this.touchStrategy.end(e);
      }
      this.saveEvent();
    }
    this.detachNodeEvents();
    getSharedEventEmitter().unsubscribe(this.globalListener);
  }

  detachNodeEvents() {
    const node = this.elementRef.current;
    if (!node) return;
    node.removeEventListener('mousedown', this.mouseDownListener);
    node.removeEventListener('touchstart', this.touchStartListener);
  }

  setupNodeSubscription() {
    const node = this.elementRef.current;
    if (!node) return;
    this.detachNodeEvents();
    node.addEventListener('mousedown', this.mouseDownListener);
    node.addEventListener('touchstart', this.touchStartListener, { passive: true });
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

  saveEvent(e?, name?) {
    this.eventParams = {
      e,
      name,
    };
  }

  globalListener([name, e]) {
    switch (name) {
      case 'mousemove':
        this.saveEvent(e, name);
        this.mouseStrategy.move(e);
        break;
      case 'mouseup':
        this.saveEvent();
        this.mouseStrategy.end(e);
        break;
      case 'touchmove': {
        this.saveEvent(e, name);
        this.touchStrategy.move(e);
        break;
      }
      case 'touchend':
      case 'touchcancel': {
        this.saveEvent();
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

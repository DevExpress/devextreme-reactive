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
  ref?: React.Ref<Element>;
};

const getDelegate = props => ({
  onStart: ({ x, y }) => {
    const { onStart } = props;
    if (!onStart) return;
    unstable_batchedUpdates(() => {
      onStart({ x, y });
    });
  },
  onMove: ({ x, y }) => {
    const { onUpdate } = props;
    if (!onUpdate) return;
    unstable_batchedUpdates(() => {
      onUpdate({ x, y });
    });
  },
  onEnd: ({ x, y }) => {
    const { onEnd } = props;
    if (!onEnd) return;
    unstable_batchedUpdates(() => {
      onEnd({ x, y });
    });
  },
});

/** @internal */
export const Draggable: React.FC<DraggableProps> = React.forwardRef((
  props, ref,
) => {
  const [mouseStrategy] = React.useState(new MouseStrategy(getDelegate(props)));
  const [touchStrategy] = React.useState(new TouchStrategy(getDelegate(props)));
  const elementRef = React.useRef<Element | null>();

  const mouseDownListener = React.useCallback((e) => {
    if (touchStrategy.isWaiting() || e[draggingHandled]) return;
    e.preventDefault();
    mouseStrategy.start(e);
    e[draggingHandled] = true;
  }, []);

  const touchStartListener = React.useCallback((e) => {
    if (e[draggingHandled]) return;
    touchStrategy.start(e);
    e[draggingHandled] = true;
  }, []);

  const globalListener = React.useCallback(([name, e]) => {
    switch (name) {
      case 'mousemove':
        mouseStrategy.move(e);
        break;
      case 'mouseup':
        mouseStrategy.end(e);
        break;
      case 'touchmove': {
        touchStrategy.move(e);
        break;
      }
      case 'touchend':
      case 'touchcancel': {
        touchStrategy.end(e);
        break;
      }
      default:
        break;
    }
    if (mouseStrategy.isDragging() || touchStrategy.isDragging()) {
      clear();
    }
  }, []);

  const setupNodeSubscription = (() => {
    const node = elementRef.current;
    if (!node) return;
    node.removeEventListener('mousedown', mouseDownListener);
    node.removeEventListener('touchstart', touchStartListener);
    node.addEventListener('mousedown', mouseDownListener);
    node.addEventListener('touchstart', touchStartListener, { passive: true });
  });

  React.useEffect(() => {
    getSharedEventEmitter().subscribe(globalListener);

    return () => getSharedEventEmitter().unsubscribe(globalListener);
  }, []);

  React.useEffect(() => {
    setupNodeSubscription();
  });

  const { children } = props;
  return <RefHolder
    ref={(node: Element | null) => {
      elementRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    }}
  >
    {children}
  </RefHolder>;
});

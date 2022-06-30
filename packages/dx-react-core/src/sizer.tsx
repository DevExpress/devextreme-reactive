/* globals document:true */

import * as React from 'react';
import { SizerProps, Size } from './types';
import { shallowEqual } from '@devexpress/dx-core';

const SCROLL_OFFSET = 2;
const styles: Record<string, React.CSSProperties> = {
  root: {
    position: 'relative',
  },
  triggersRoot: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    zIndex: -1,
    visibility: 'hidden',
    opacity: 0,
  },
  expandTrigger: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    overflow: 'auto',
  },
  contractTrigger: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    overflow: 'auto',
    minHeight: '1px',
    minWidth: '1px',
  },
  contractNotifier: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '200%',
    height: '200%',
    minHeight: '2px',
    minWidth: '2px',
  },
};

/** @internal */
export class Sizer extends React.Component<SizerProps> {
  static defaultProps = {
    containerComponent: 'div',
  };

  rootRef: React.RefObject<HTMLElement>;
  expandTriggerRef: React.RefObject<HTMLDivElement>;
  contractTriggerRef: React.RefObject<HTMLDivElement>;
  expandNotifierRef: React.RefObject<HTMLDivElement>;

  rootNode: HTMLElement | null = null;
  expandTrigger: HTMLDivElement | null = null;
  expandNotifier: HTMLDivElement | null = null;
  contractTrigger: HTMLDivElement | null = null;

  constructor(props) {
    super(props);

    this.setupListeners = this.setupListeners.bind(this);
    this.updateScrolling = this.updateScrolling.bind(this);
    this.rootRef = React.createRef();
    this.expandTriggerRef = React.createRef();
    this.contractTriggerRef = React.createRef();
    this.expandNotifierRef = React.createRef();
  }

  componentDidMount() {
    if (!this.rootRef.current) {
      return;
    }
    this.rootNode = this.rootRef.current;
    this.expandTrigger = this.expandTriggerRef.current;
    this.contractTrigger = this.contractTriggerRef.current;
    this.expandNotifier = this.expandNotifierRef.current;

    this.expandTrigger?.addEventListener('scroll', this.setupListeners);
    this.contractTrigger?.addEventListener('scroll', this.setupListeners);
    this.setupListeners();
  }

  shouldComponentUpdate(prevProps) {
    if (prevProps.scrollTop !== this.props.scrollTop ||
      prevProps.scrollLeft !== this.props.scrollLeft ||
      (prevProps.style && this.props.style &&
        !shallowEqual(prevProps.style, this.props.style)) ||
        (prevProps.style && !this.props.style)) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    // We can scroll the VirtualTable manually only by changing
    // containter's (rootNode) scrollTop property.
    // Viewport changes its own properties automatically.
    const { scrollTop, scrollLeft } = this.props;
    if (!this.rootNode) {
      return;
    }
    if (scrollTop !== undefined && scrollTop > -1) {
      this.rootNode.scrollTop = scrollTop;
    }
    if (scrollLeft !== undefined && scrollLeft > -1) {
      this.rootNode.scrollLeft = scrollLeft;
    }
    this.updateScrolling(this.getSize());
  }

  // There is no need to remove listeners as divs are removed from DOM when component is unmount.
  // But there is a little chance that component unmounting and 'scroll' event happen roughly
  // at the same time so that `setupListeners` is called after component is unmount.
  componentWillUnmount() {
    this.expandTrigger?.removeEventListener('scroll', this.setupListeners);
    this.contractTrigger?.removeEventListener('scroll', this.setupListeners);
  }

  getSize = (): Size => ({
    height: this.rootNode!.clientHeight,
    width: this.rootNode!.clientWidth,
  })

  setupListeners() {
    const size = this.getSize();
    const { width, height } = size;

    if (this.expandNotifier) {
      this.expandNotifier.style.width = `${width + SCROLL_OFFSET}px`;
      this.expandNotifier.style.height = `${height + SCROLL_OFFSET}px`;
    }

    this.updateScrolling(size);

    const { onSizeChange } = this.props;
    onSizeChange(size);
  }

  updateScrolling(size) {
    const { width, height } = size;
    if (this.contractTrigger) {
      this.contractTrigger.scrollTop = height;
      this.contractTrigger.scrollLeft = width;
    }
    if (this.expandTrigger) {
      this.expandTrigger.scrollTop = SCROLL_OFFSET;
      this.expandTrigger.scrollLeft = SCROLL_OFFSET;
    }
  }

  render() {
    const {
      onSizeChange,
      containerComponent: Container,
      style,
      scrollTop,
      scrollLeft,
      ...restProps
    } = this.props;

    return (
      <Container // NOTE: should have `position: relative`
        forwardedRef={this.rootRef}
        style={style ? { ...styles.root, ...style } : styles.root}
        {...restProps}
      >
        <div style={styles.triggersRoot}>
          <div style={styles.expandTrigger} ref={this.expandTriggerRef}>
            <div ref={this.expandNotifierRef}/>
          </div>
          <div style={styles.contractTrigger} ref={this.contractTriggerRef}>
            <div style={styles.contractNotifier}/>
          </div>
        </div>
      </Container>
    );
  }
}

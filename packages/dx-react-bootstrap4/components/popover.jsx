/* globals document:true Element:true */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import { Popper } from 'react-popper';

export class Popover extends React.PureComponent {
  constructor(props) {
    super(props);

    this.contentRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { isOpen } = this.props;
    if (isOpen) {
      this.attachDocumentEvents();
    }
  }

  componentDidUpdate() {
    const { isOpen } = this.props;
    if (isOpen) {
      this.attachDocumentEvents();
    } else {
      this.detachDocumentEvents();
    }
  }

  componentWillUnmount() {
    this.detachDocumentEvents();
  }

  handleClick(e) {
    const { target: eventTarget } = e;
    const { current: contentNode } = this.contentRef;
    const { toggle, target } = this.props;

    if (contentNode && !contentNode.contains(eventTarget) && !target.contains(eventTarget)) {
      toggle();
    }
  }

  attachDocumentEvents() {
    if (!this.listenersAttached) {
      this.toggleDocumentEvents('addEventListener');
      this.listenersAttached = true;
    }
  }

  detachDocumentEvents() {
    if (this.listenersAttached) {
      this.toggleDocumentEvents('removeEventListener');
      this.listenersAttached = false;
    }
  }

  toggleDocumentEvents(method) {
    ['click', 'touchstart'].forEach((eventType) => {
      document[method](eventType, this.handleClick, true);
    });
  }

  renderPopper() {
    const {
      children, target, container, ...restProps
    } = this.props;

    return (
      <Popper
        referenceElement={target}
        {...restProps}
      >
        {({
          ref, style, arrowProps, placement,
        }) => (
          <div className={`popover show bs-popover-${placement}`} ref={ref} style={style}>
            <div className="popover-inner" ref={this.contentRef}>
              {children}
            </div>
            <div className="arrow" ref={arrowProps.ref} style={arrowProps.style} />
          </div>
        )}
      </Popper>
    );
  }

  render() {
    const {
      isOpen, container,
    } = this.props;

    if (!isOpen) return null;

    return container === 'body'
      ? (
        ReactDOM.createPortal(
          this.renderPopper(),
          document.body,
        )
      )
      : this.renderPopper();
  }
}

Popover.propTypes = {
  container: PropTypes.string,
  placement: PropTypes.string,
  isOpen: PropTypes.bool,
  children: PropTypes.node.isRequired,
  target: PropTypes.oneOfType([
    PropTypes.instanceOf((typeof Element !== 'undefined') ? Element : Object),
    PropTypes.object,
  ]),
  toggle: PropTypes.func,
};

Popover.defaultProps = {
  target: null,
  container: 'body',
  isOpen: false,
  placement: 'auto',
  toggle: () => {},
};

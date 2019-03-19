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
    this.toggleSubscribtions();
  }

  componentDidUpdate() {
    this.toggleSubscribtions();
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

  toggleSubscribtions() {
    const { isOpen } = this.props;

    if (isOpen) {
      this.attachDocumentEvents();
    } else {
      this.detachDocumentEvents();
    }
  }

  attachDocumentEvents() {
    this.toggleDocumentEvents('addEventListener');
  }

  detachDocumentEvents() {
    this.toggleDocumentEvents('removeEventListener');
  }

  toggleDocumentEvents(method) {
    ['click', 'touchstart'].forEach((eventType) => {
      document[method](eventType, this.handleClick, true);
    });
  }

  renderPopper() {
    const {
      children, target, renderInBody, ...restProps
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
      isOpen, renderInBody,
    } = this.props;

    if (!isOpen) return null;

    return renderInBody
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
  renderInBody: PropTypes.bool,
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
  renderInBody: true,
  isOpen: false,
  placement: 'auto',
  toggle: () => {},
};

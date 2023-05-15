/* globals document:true Element:true */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Popper } from 'react-popper';

const DefaultArrowComponent = React.forwardRef(({ placement, ...restProps }, ref) => (
  <div className="arrow" ref={ref} {...restProps} />
));

DefaultArrowComponent.propTypes = {
  placement: PropTypes.string.isRequired,
};
export class Popover extends React.PureComponent {
  constructor(props) {
    super(props);

    // These two fields should be created only if `isOpen && toggle` condition is true
    // and destroyed when condition turns false.
    // But it would require usage of `this.state` and other code complications.
    // So let's not change it for now. Maybe a better solution would be found.
    this.contentRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { isOpen, toggle } = this.props;
    if (isOpen && toggle) {
      this.attachDocumentEvents();
    }
  }

  componentDidUpdate() {
    const { isOpen, toggle } = this.props;
    if (isOpen && toggle) {
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
      children, target, renderInBody,
      arrowComponent: ArrowComponent, modifiers = [],
      ...restProps
    } = this.props;

    const popperModifiers = [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
      ...modifiers,
    ];

    return (
      <Popper
        referenceElement={target}
        modifiers={popperModifiers}
        {...restProps}
      >
        {({
          ref, style, arrowProps, placement,
        }) => (
          <div className={`popover show bs-popover-${placement}`} ref={ref} style={style}>
            <div className="popover-inner" ref={this.contentRef}>
              {children}
            </div>
            <ArrowComponent
              {...arrowProps}
              placement={restProps.placement}
            />
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
  arrowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

Popover.defaultProps = {
  target: null,
  renderInBody: true,
  isOpen: false,
  placement: 'auto',
  toggle: undefined,
  arrowComponent: DefaultArrowComponent,
};

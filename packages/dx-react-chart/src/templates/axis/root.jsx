import * as React from 'react';
import * as PropTypes from 'prop-types';

const getOffset = position => (position >= 0 ? 0 : -position);
const getSize = (position, delta) => (position >= 0 ? position + delta : -position);

export class Root extends React.PureComponent {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      x: 0, y: 0,
    };
    this.adjust = this.adjust.bind(this);
  }

  componentDidMount() {
    this.setState(this.adjust);
  }

  componentDidUpdate() {
    // *setState* is called unconditionally because PureComponent is expected to break the cycle.
    this.setState(this.adjust); // eslint-disable-line react/no-did-update-set-state
  }

  // Since calculated state does not depend on current state non-callback version of *setState*
  // might have been expected - it can't be done.
  // Parent component (Axis) accesses its DOM content in *onSizeChange* handler. When
  // this component is mounted parent is not yet - it crashes on DOM access.
  // *setState* callback is invoked later then *componentDidMount* - by that time parent component
  // is already mounted and can access its DOM.
  // Because of it callback version of *setState* has to be used here.
  // Can we rely on the fact that by the time of callback parent is mounted?
  // For now we stick with it, but need to find a more solid solution.
  adjust(_, { dx, dy, onSizeChange }) {
    const bbox = this.ref.current.getBBox();
    const width = dx ? bbox.width : getSize(bbox.x, bbox.width);
    const height = dy ? bbox.height : getSize(bbox.y, bbox.height);
    const x = dx ? 0 : getOffset(bbox.x);
    const y = dy ? 0 : getOffset(bbox.y);
    onSizeChange({ width, height });
    return { x, y };
  }

  render() {
    const { children, onSizeChange, ...restProps } = this.props;
    const { x, y } = this.state;
    return (
      <g
        ref={this.ref}
        transform={`translate(${x} ${y})`}
        {...restProps}
      >
        {children}
      </g>
    );
  }
}

Root.propTypes = {
  dx: PropTypes.number.isRequired,
  dy: PropTypes.number.isRequired,
  onSizeChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

import * as React from 'react';
import * as PropTypes from 'prop-types';

const getOffset = position => (position >= 0 ? 0 : -position);
const getSize = (position, delta) => (position >= 0 ? position + delta : -position);

export class Root extends React.PureComponent {
  constructor(props) {
    super(props);
    this.ref = (node) => {
      this.node = node;
    };
    this.state = {
      x: 0, y: 0,
    };
    this.adjust = this.adjust.bind(this);
  }

  componentDidMount() {
    this.setState(this.adjust);
  }

  componentDidUpdate() {
    // *setState* can be called unconditionally because it contains proper check inside.
    this.setState(this.adjust); // eslint-disable-line react/no-did-update-set-state
  }

  adjust(_, { dx, dy, onSizeChange }) {
    const bbox = this.node.getBBox();
    const width = dx ? bbox.width : getSize(bbox.x, bbox.width);
    const height = dy ? bbox.height : getSize(bbox.y, bbox.height);
    const x = dx ? 0 : getOffset(bbox.x);
    const y = dy ? 0 : getOffset(bbox.y);
    onSizeChange({ width, height });
    return {
      x, y,
    };
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

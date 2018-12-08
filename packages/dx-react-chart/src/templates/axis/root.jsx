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
    this.adjust();
  }

  componentDidUpdate() {
    this.adjust();
  }

  adjust() {
    const { dx, dy, onSizeChange } = this.props;
    const bbox = this.node.getBBox();
    const width = dx ? bbox.width : getSize(bbox.x, bbox.width);
    const height = dy ? bbox.height : getSize(bbox.y, bbox.height);
    const x = dx ? 0 : getOffset(bbox.x);
    const y = dy ? 0 : getOffset(bbox.y);
    onSizeChange({ width, height });
    this.setState({ x, y });
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


import * as React from 'react';
import * as PropTypes from 'prop-types';
import { TemplatePlaceholder } from '@devexpress/dx-react-core';

const createRefsHandler = (placeholder, changeBBox) => (el) => {
  if (!el) return;
  const { width, height } = el.getBoundingClientRect();
  changeBBox({ placeholder, bBox: { width, height } });
};

export class Pane extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onContainerRef = this.onContainerRef.bind(this);
  }
  componentDidMount() {
    const { changeBBox } = this.props;
    createRefsHandler('pane', changeBBox)(this.node);
  }
  componentDidUpdate() {
    const { changeBBox } = this.props;
    createRefsHandler('pane', changeBBox)(this.node);
  }
  onContainerRef(node) {
    this.node = node;
  }
  calculateLayout(width, height) {
    const calculatedWidth = width;
    const calculatedHeight = height;
    const {
      width: containerWidth,
      height: containerHeight,
    } = (this.node && this.node.getBoundingClientRect()) || {};
    return {
      width: containerWidth || calculatedWidth,
      height: containerHeight || calculatedHeight,
    };
  }
  render() {
    const { layouts } = this.props;
    const { widthLayout, heightLayout } = layouts.pane || {};
    const { width, height } = this.calculateLayout(widthLayout, heightLayout);

    return (
      <div ref={this.onContainerRef} style={{ position: 'relative', flexGrow: 1 }}>
        <svg
          width={width}
          height={height}
          style={{
            position: 'absolute', left: 0, top: 0, overflow: 'visible',
          }}
        >
          <TemplatePlaceholder name="series" />
        </svg>
      </div>
    );
  }
}

Pane.propTypes = {
  changeBBox: PropTypes.func.isRequired,
  layouts: PropTypes.object.isRequired,
};


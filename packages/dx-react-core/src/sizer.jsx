import * as React from 'react';
import * as PropTypes from 'prop-types';

const styles = {
  root: {
    position: 'relative',
  },
  triggers: {
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
  expand: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    overflow: 'auto',
  },
  contract: {
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
    width: '200%',
    height: '200%',
  },
};

export class Sizer extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      size: { width: 0, height: 0 },
    };

    this.setupListeners = this.setupListeners.bind(this);
  }

  componentDidMount() {
    this.setupListeners();
  }

  setupListeners() {
    const size = { height: this.root.offsetHeight, width: this.root.offsetWidth };

    this.contract.scrollTop = size.height;
    this.contract.scrollLeft = size.width;

    this.expandTrigger.style.width = `${size.width + 1}px`;
    this.expandTrigger.style.height = `${size.height + 1}px`;
    this.expand.scrollTop = 1;
    this.expand.scrollLeft = 1;

    this.setState({ size });
  }

  render() {
    const { size } = this.state;
    const { children, style } = this.props;

    return (
      <div
        ref={(node) => { this.root = node; }}
        style={{ ...styles.root, ...style }}
      >
        {children(size)}
        <div style={styles.triggers}>
          <div
            ref={(node) => { this.expand = node; }}
            style={styles.expand}
            onScroll={this.setupListeners}
          >
            <div
              ref={(node) => { this.expandTrigger = node; }}
            />
          </div>
          <div
            ref={(node) => { this.contract = node; }}
            style={styles.contract}
            onScroll={this.setupListeners}
          >
            <div
              style={styles.contractTrigger}
            />
          </div>
        </div>
      </div>
    );
  }
}

Sizer.propTypes = {
  children: PropTypes.func.isRequired,
  style: PropTypes.object,
};

Sizer.defaultProps = {
  style: null,
};

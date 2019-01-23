import * as React from 'react';
import * as ReactDOM from 'react-dom';

const analyze = (list) => {
  const items = list.slice().sort((a, b) => a - b);
  const len = items.length;
  return {
    min: items[0],
    max: items[len - 1],
    avg: items.reduce((a, b) => a + b, 0) / len,
    med: (items[(len - 1) >> 1] + items[len >> 1]) / 2, // eslint-disable-line no-bitwise
  };
};

const listStyle = {
  position: 'relative',
  width: '100%',
  height: '500px',
};

const itemStyle = {
  position: 'absolute',
  width: '100%',
  left: '0',
  top: '0',
};

const spanStyle = {
  padding: '4px',
};

export const wrapDemo = (Demo, count = 16) => {
  class WrappedDemo extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {};
      this.itemsRefs = Array.from({ length: count }).map(React.createRef);
    }

    componentDidMount() {
      // Looks like that when `ReactDOM.render` is called inside a "thread" where another component
      // is already being rendered function returns almost immediately (end ~= start) and render
      // request is scheduled.
      // Calling `ReactDOM.render` in another "thread" seems to help.
      this.timeout = setTimeout(() => {
        this.initialized = true;
        const node = React.createElement(Demo, {});
        const times = this.itemsRefs.map((ref) => {
          const start = performance.now();
          ReactDOM.render(node, ref.current);
          const end = performance.now();
          return end - start;
        });
        this.setState({
          metrics: analyze(times),
        });
      }, 10);
    }

    componentDidUpdate() {
      if (this.initialized) {
        const node = React.createElement(Demo, {});
        this.itemsRefs.forEach((ref) => {
          ReactDOM.render(node, ref.current);
        });
      }
    }

    componentWillUnmount() {
      clearTimeout(this.timeout);
      if (this.initialized) {
        this.itemsRefs.forEach((ref) => {
          ReactDOM.unmountComponentAtNode(ref.current);
        });
      }
    }

    render() {
      const { metrics } = this.state;
      return (
        <div className="performance-metrics">
          <div>
            <h3>Metrics</h3>
            {Object.keys(metrics || {}).map(name => (
              <React.Fragment key={name}>
                <span style={spanStyle}>{name.toUpperCase()}</span>
                <span style={spanStyle}>{metrics[name].toFixed(2)}</span>
              </React.Fragment>
            ))}
          </div>
          <div className="demo-list" style={listStyle}>
            {this.itemsRefs.map((ref, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div ref={ref} key={i} className="demo-item" style={itemStyle} />
            ))}
          </div>
        </div>
      );
    }
  }

  return WrappedDemo;
};

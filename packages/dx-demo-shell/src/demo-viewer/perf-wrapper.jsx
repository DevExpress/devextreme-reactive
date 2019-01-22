import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';

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

export const wrapDemo = (Demo) => {
  class WrappedDemo extends React.PureComponent {
    constructor(props) {
      super(props);
      this.ref = React.createRef();
      this.state = { };
    }

    componentDidMount() {
      const { count } = this.props;
      setTimeout(() => {
        this.createSamples(count);
      }, 50);
    }

    componentDidUpdate() {
      this.updateSamples();
    }

    componentWillUnmount() {
      this.destroySamples();
    }

    createSamples(count) {
      const root = this.ref.current;
      const node = React.createElement(Demo, {});
      const times = Array.from({ length: count }).map(() => {
        const container = document.createElement('div');
        container.classList.add('demo-item');
        Object.keys(itemStyle).forEach((name) => {
          container.style[name] = itemStyle[name];
        });
        root.appendChild(container);
        const start = performance.now();
        ReactDOM.render(node, container);
        const end = performance.now();
        return end - start;
      });
      const metrics = analyze(times);
      this.setState({ metrics });
    }

    updateSamples() {
      const root = this.ref.current;
      const node = React.createElement(Demo, {});
      Array.from(root.childNodes).forEach((container) => {
        ReactDOM.render(node, container);
      });
    }

    destroySamples() {
      const root = this.ref.current;
      Array.from(root.childNodes).forEach(ReactDOM.unmountComponentAtNode);
    }

    render() {
      const { metrics } = this.state;
      return (
        <div className="performance">
          <div>
            <h3>Metrics</h3>
            {Object.keys(metrics || {}).map(name => (
              <React.Fragment key={name}>
                <span style={spanStyle}>{name.toUpperCase()}</span>
                <span style={spanStyle}>{metrics[name].toFixed(2)}</span>
              </React.Fragment>
            ))}
          </div>
          <div ref={this.ref} className="demo-list" style={listStyle} />
        </div>
      );
    }
  }

  WrappedDemo.propTypes = {
    count: PropTypes.number,
  };

  WrappedDemo.defaultProps = {
    count: 16,
  };

  return WrappedDemo;
};

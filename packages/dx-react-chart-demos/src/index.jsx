import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { initialize } from '@devexpress/dx-demo-shell';
import '@devexpress/dx-demo-shell/dist/index.css';
import { demos } from './demo-registry';
import { themes } from './theme-registry';
import './index.css';

const COUNT = 16;

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

const wrapDemo = (Demo) => {
  const listStyle = {
    position: 'relative',
    width: '100%',
    height: '500px',
  };

  class WrappedDemo extends React.PureComponent {
    constructor(props) {
      super(props);
      this.ref = React.createRef();
    }

    componentDidMount() {
      setTimeout(() => {
        this.createSamples();
      }, 50);
    }

    componentDidUpdate() {
      this.updateSamples();
    }

    componentWillUnmount() {
      this.destroySamples();
    }

    createSamples() {
      const root = this.ref.current;
      const node = React.createElement(Demo, {});
      const times = Array.from({ length: COUNT }).map(() => {
        const container = document.createElement('div');
        container.classList.add('demo-item');
        container.style.position = 'absolute';
        container.style.width = '100%';
        container.style.top = '0';
        container.style.left = '0';
        root.appendChild(container);
        const start = new Date();
        ReactDOM.render(node, container);
        const end = new Date();
        return end - start;
      });
      const {
        min, max, avg, med,
      } = analyze(times);
      console.log(`TIME: ${min}..${max} avg=${avg} med=${med}`);
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
      return <div ref={this.ref} className="demo-list" style={listStyle} />;
    }
  }

  return WrappedDemo;
};

initialize({
  demoSources: demos,
  themeSources: themes,
  renderDemo: ({
    element,
    demo: Demo,
    demoContainer,
  }) => {
    const WrappedDemo = /* Demo || */ wrapDemo(Demo);
    const DemoContainer = demoContainer || 'div';
    ReactDOM.render(
      (
      // <React.StrictMode>
        <DemoContainer>
          <WrappedDemo />
        </DemoContainer>
      // </React.StrictMode>
      ),
      element,
    );
  },
  unmountDemo: ({
    element,
  }) => {
    ReactDOM.unmountComponentAtNode(element);
  },
});

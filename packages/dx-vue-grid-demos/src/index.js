import Vue from 'vue';
import { initialize } from '@devexpress/dx-demo-shell';
import '@devexpress/dx-demo-shell/dist/index.css';
import { demos } from './demo-registry';
import { themes } from './theme-registry';
import './index.css';

const vms = new Map();

initialize({
  demoSources: demos,
  themeSources: themes,
  renderDemo: ({
    element,
    demo: Demo,
    demoContainer,
  }) => {
    vms.set(element, new Vue({
      el: element,
      render() {
        const DemoContainer = demoContainer || 'div';
        return (
          <DemoContainer>
            <Demo />
          </DemoContainer>
        );
      },
    }));
  },
  unmountDemo: ({
    element,
  }) => {
    vms.get(element).$destroy();
    vms.delete(element);
  },
});

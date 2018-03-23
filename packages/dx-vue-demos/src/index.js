import Vue from 'vue';
import { initialize } from '@devexpress/dx-demo-shell';
import '@devexpress/dx-demo-shell/dist/index.css';
import { demos } from './demo-registry';
import { themes } from './theme-registry';

const vms = new Map();

initialize({
  demoSources: demos,
  themeSources: themes,
  renderDemo: ({
    element,
    demo: Demo,
    demoContainer: DemoContainer,
  }) => {
    vms.set(element, new Vue({
      el: element,
      render() {
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

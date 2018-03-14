import Vue from 'vue';
import { initialize } from '@devexpress/dx-demo-shell';
import '@devexpress/dx-demo-shell/dist/index.css';
import { demos } from './demo-registry';
import { themes } from './theme-registry';

initialize({
  demoSources: demos,
  themeSources: themes,
  renderDemo: ({
    element,
    demo: Demo,
    demoContainer: DemoContainer,
  }) => {
    // eslint-disable-next-line no-new
    new Vue({
      el: element,
      render() {
        return (
          <DemoContainer>
            <Demo />
          </DemoContainer>
        );
      },
    });
  },
});

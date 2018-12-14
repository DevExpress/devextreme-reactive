import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { initialize } from '@devexpress/dx-demo-shell';
import '@devexpress/dx-demo-shell/dist/index.css';
import { themes } from './theme-registry';
import { demos as gridDemos } from './grid-demo-registry';
import { demos as chartDemos } from './chart-demo-registry';
import { demos as schedulerDemos } from './scheduler-demo-registry';

const allDemos = { ...gridDemos, ...chartDemos, ...schedulerDemos };

initialize({
  demoSources: allDemos,
  themeSources: themes,
  renderDemo: ({
    element,
    demo: Demo,
    demoContainer,
  }) => {
    const DemoContainer = demoContainer || 'div';
    ReactDOM.render(
      (
        <DemoContainer>
          <Demo />
        </DemoContainer>
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

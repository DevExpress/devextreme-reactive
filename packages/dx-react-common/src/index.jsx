import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { initialize } from '@devexpress/dx-demo-shell';
import '@devexpress/dx-demo-shell/dist/index.css';
import { gridDemos } from '@devexpress/dx-react-grid-demos/dist';
// import { gridDemos } from '../../dx-react-grid-demos/src/demo-registry';
// import { chartDemos } from '../../dx-react-chart-demos/src/demo-registry';
// import { schedulerDemos } from '../../dx-react-scheduler-demos/src/demo-registry';
import { themes } from './theme-registry';

const allDemos = { ...gridDemos };

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

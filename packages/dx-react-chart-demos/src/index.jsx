import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { initialize } from '@devexpress/dx-demo-shell';
import '@devexpress/dx-demo-shell/dist/index.css';
import { demos } from './demo-registry';
import { themes } from './theme-registry';
import './index.css';

initialize({
  demoSources: demos,
  themeSources: themes,
  renderDemo: ({
    element,
    demo: Demo,
    demoContainer,
  }) => {
    const DemoContainer = demoContainer || 'div';
    ReactDOM.render(
      (
        <React.StrictMode>
          <DemoContainer>
            <Demo />
          </DemoContainer>
        </React.StrictMode>
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

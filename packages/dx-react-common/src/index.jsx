import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { initialize } from '@devexpress/dx-demo-shell';
import '@devexpress/dx-demo-shell/dist/index.css';
import { themes } from './theme-registry';
import { demos as gridDemos } from './grid-demo-registry';
import { demos as chartDemos } from './chart-demo-registry';
import { demos as schedulerDemos } from './scheduler-demo-registry';
import { themeComponents as gridComponents } from './grid-theme-components-registry';
import { themeComponents as chartComponents } from './chart-theme-components-registry';
import { themeComponents as schedulerComponents } from './scheduler-theme-components-registry';
import { demoData as gridData } from './grid-demo-data-registry';
import { demoData as chartData } from './chart-demo-data-registry';
import { demoData as schedulerData } from './scheduler-demo-data-registry';

const allDemos = { ...gridDemos, ...chartDemos, ...schedulerDemos };
const allDemoData = { ...gridData, ...chartData, ...schedulerData };
const allThemeComponents = { ...gridComponents, ...chartComponents, ...schedulerComponents };

initialize({
  demoSources: allDemos,
  themeSources: themes,
  themeComponents: allThemeComponents,
  demoData: allDemoData,
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

import * as React from 'react';
import {
  TOP, BOTTOM, LEFT, RIGHT,
} from '@devexpress/dx-chart-core';
import { Plugin, Template, TemplatePlaceholder } from '@devexpress/dx-react-core';

export const ComponentLayout: React.FunctionComponent = () => (
  <Plugin name="ComponentLayout">
    <Template name="canvas">
      <div id={`${TOP}-container`} style={{ display: 'flex', flexDirection: 'row' }}>
        <TemplatePlaceholder name={`${TOP}-${LEFT}`} />
        <TemplatePlaceholder name={TOP} />
        <TemplatePlaceholder name={`${TOP}-${RIGHT}`} />
      </div>
      <div id="center-container" style={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
        <TemplatePlaceholder name={LEFT} />
        <TemplatePlaceholder />
        <TemplatePlaceholder name={RIGHT} />
      </div>
      <div id={`${BOTTOM}-container`} style={{ display: 'flex', flexDirection: 'row' }}>
        <TemplatePlaceholder name={`${BOTTOM}-${LEFT}`} />
        <TemplatePlaceholder name={BOTTOM} />
        <TemplatePlaceholder name={`${BOTTOM}-${RIGHT}`} />
      </div>
    </Template>
  </Plugin>
);

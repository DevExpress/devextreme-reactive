import * as React from 'react';
import {
  TOP, BOTTOM, LEFT, RIGHT,
} from '@devexpress/dx-chart-core';
import { Plugin, Template, TemplatePlaceholder } from '@devexpress/dx-react-core';

export const AxesLayout: React.SFC = () => (
  <Plugin>
    <Template name="canvas">
      <div id="center-center" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div id={`${TOP}-axis-container`} style={{ display: 'flex', flexDirection: 'row' }}>
          <TemplatePlaceholder name={`${TOP}-${LEFT}-axis`} />
          <TemplatePlaceholder name={`${TOP}-axis`} />
          <TemplatePlaceholder name={`${TOP}-${RIGHT}-axis`} />
        </div>
        <div
          id="center-axis-container"
          style={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}
        >
          <TemplatePlaceholder name={`${LEFT}-axis`} />
          <TemplatePlaceholder />
          <TemplatePlaceholder name={`${RIGHT}-axis`} />
        </div>
        <div id={`${BOTTOM}-axis-container`} style={{ display: 'flex', flexDirection: 'row' }}>
          <TemplatePlaceholder name={`${BOTTOM}-${LEFT}-axis`} />
          <TemplatePlaceholder name={`${BOTTOM}-axis`} />
          <TemplatePlaceholder name={`${BOTTOM}-${RIGHT}-axis`} />
        </div>
      </div>
    </Template>
  </Plugin>
);

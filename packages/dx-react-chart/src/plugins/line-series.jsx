import * as React from 'react';

import { Template, Plugin, TemplateConnector } from '@devexpress/dx-react-core';

export const LineSeries = () => ((
  <Plugin
    name="LineSeries"
  >
    <Template name="pane">
      <TemplateConnector>
        {({ dAttr }) => ((
          <g>
            <path d={dAttr} style={{ stroke: 'black', strokeWidth: '1px', fill: 'none' }} />
          </g>))}
      </TemplateConnector>
    </Template>
  </Plugin>));

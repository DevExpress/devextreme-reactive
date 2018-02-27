import * as React from 'react';

import { Template, Plugin, TemplateConnector } from '@devexpress/dx-react-core';
import { line } from 'd3-shape';

const getX = ({ x }) => x;
const getY = ({ y }) => y;

export const LineSeries = () => (
  <Plugin name="LineSeries">
    <Template name="pane">
      <TemplateConnector>
        {({ linePath }) => ((
          <g>
            <path
              d={line()
                .x(getX)
                .y(getY)(linePath)}
              style={{ stroke: 'black', strokeWidth: '1px', fill: 'none' }}
            />
          </g>))
        }
      </TemplateConnector>
    </Template>
  </Plugin>
);

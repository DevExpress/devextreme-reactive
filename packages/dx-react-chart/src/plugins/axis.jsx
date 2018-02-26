import * as React from 'react';

import { Plugin, TemplateConnector, Template, TemplatePlaceholder } from '@devexpress/dx-react-core';

export const Axis = props => (
  <Plugin name="Axis">
    <Template name="axis">
      <TemplatePlaceholder />
      <TemplateConnector>
        {({ path }) => {
          debugger;
          return path[props.dataField].map(item => (
            <text key={item.text} x={item.x} y="20">
              {JSON.stringify(item.text)}
            </text>
          ));
        }
      }
      </TemplateConnector>
    </Template>
  </Plugin>
);

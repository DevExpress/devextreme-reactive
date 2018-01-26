import React from 'react';
import {
  PluginHost,
  Plugin,
  Template,
  Getter,
  TemplateConnector,
} from '@devexpress/dx-react-core';

const Plugin1 = () => (
  <Plugin>
    <Getter name="userName" value="john" />
  </Plugin>
);

const Plugin2 = () => (
  <Plugin>
    <Template name="root">
      <TemplateConnector>
        {({ userName }) => (
          <span>User Name: {userName}</span>
        )}
      </TemplateConnector>
    </Template>
  </Plugin>
);

export default () => (
  <PluginHost>
    <Plugin1 />
    <Plugin2 />
  </PluginHost>
);

import React from 'react';
import {
  PluginHost,
  PluginContainer,
  Template,
  Getter,
  TemplateConnector,
} from '@devexpress/dx-react-core';

const Plugin1 = () => (
  <PluginContainer>
    <Getter name="userName" value="john" />
    <Template name="root">
      <TemplateConnector>
        {({ userName }) => (
          <span>User Name: {userName}</span>
        )}
      </TemplateConnector>
    </Template>
  </PluginContainer>
);

const Plugin2 = () => (
  <PluginContainer>
    <Getter name="userName" computed={({ userName }) => userName.toUpperCase()} />
  </PluginContainer>
);

export default () => (
  <PluginHost>
    <Plugin1 />
    <Plugin2 />
  </PluginHost>
);

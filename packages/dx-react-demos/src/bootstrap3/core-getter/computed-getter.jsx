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
    <Getter name="count" value={11} />
    <Template name="root">
      <TemplateConnector>
        {({ count }) => (
          <span>(total count): {count}</span>
        )}
      </TemplateConnector>
    </Template>
  </PluginContainer>
);

const Plugin2 = () => (
  <PluginContainer>
    <Getter name="count" computed={({ count }) => count - 1} />
  </PluginContainer>
);

export default () => (
  <PluginHost>
    <Plugin1 />
    <Plugin2 />
  </PluginHost>
);

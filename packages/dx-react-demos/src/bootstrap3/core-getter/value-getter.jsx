import React from 'react';
import {
  PluginHost,
  PluginContainer,
  Template,
  Getter,
  TemplateConnector,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';

const Plugin1 = () => (
  <PluginContainer>
    <Getter name="count" value={11} />
    <Template name="root">
      <TemplateConnector>
        {({ count }) => (
          <span>(count): {count}</span>
        )}
      </TemplateConnector>
    </Template>
  </PluginContainer>
);

const Plugin2 = () => (
  <PluginContainer>
    <Template name="root">
      <TemplatePlaceholder />
      <br />
      <TemplateConnector>
        {({ count }) => (
          <span>(count - 1): {count - 1}</span>
        )}
      </TemplateConnector>
    </Template>
  </PluginContainer>
);

export default () => (
  <PluginHost>
    <Plugin1 />
    <Plugin2 />
  </PluginHost>
);

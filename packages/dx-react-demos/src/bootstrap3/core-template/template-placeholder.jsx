import React from 'react';
import {
  PluginHost,
  PluginContainer,
  Template,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';

const Plugin1 = () => (
  <PluginContainer>
    <Template name="root">
      Root content:
      {' '}
      <TemplatePlaceholder name="content" />
    </Template>
  </PluginContainer>
);

const Plugin2 = () => (
  <PluginContainer>
    <Template name="content">
      sample text
    </Template>
  </PluginContainer>
);

export default () => (
  <PluginHost>
    <Plugin1 />
    <Plugin2 />
  </PluginHost>
);

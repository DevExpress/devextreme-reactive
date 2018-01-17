import React from 'react';
import {
  PluginHost,
  PluginContainer,
  Template,
} from '@devexpress/dx-react-core';

const Plugin = () => (
  <PluginContainer>
    <Template name="root">
      Root content
    </Template>
  </PluginContainer>
);

export default () => (
  <PluginHost>
    <Plugin />
  </PluginHost>
);

import React from 'react';
import {
  PluginHost,
  Plugin,
  Template,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';

const Plugin1 = () => (
  <Plugin>
    <Template name="root">
      Root content:
      {' '}
      <TemplatePlaceholder name="content" />
    </Template>
  </Plugin>
);

const Plugin2 = () => (
  <Plugin>
    <Template name="content">
      sample text
    </Template>
  </Plugin>
);

export default () => (
  <PluginHost>
    <Plugin1 />
    <Plugin2 />
  </PluginHost>
);

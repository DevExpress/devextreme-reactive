import React from 'react';
import {
  PluginHost,
  Plugin,
  Template,
} from '@devexpress/dx-react-core';

const Plugin1 = () => (
  <Plugin>
    <Template name="root">
      Root content
    </Template>
  </Plugin>
);

export default () => (
  <PluginHost>
    <Plugin1 />
  </PluginHost>
);

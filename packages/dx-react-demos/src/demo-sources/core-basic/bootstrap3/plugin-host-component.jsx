import React from 'react';
import {
  PluginHost,
  Template,
} from '@devexpress/dx-react-core';

const PluginBased = () => (
  <PluginHost>
    {/* Plugin root */}
    <Template name="root">
      Rendering root
    </Template>
  </PluginHost>
);

export default () => (
  <PluginBased />
);

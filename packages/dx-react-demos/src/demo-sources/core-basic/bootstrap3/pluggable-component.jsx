import React from 'react';
import {
  PluginHost,
  Template,
} from '@devexpress/dx-react-core';

const Pluggable = () => (
  <PluginHost>
    {/* Plugin root */}
    <Template name="root">
      Rendering root
    </Template>
  </PluginHost>
);

export default () => (
  <Pluggable />
);

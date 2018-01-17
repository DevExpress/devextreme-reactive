import React from 'react';
import {
  PluginHost,
  PluginContainer,
  Template,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';

const Plugin = () => (
  <PluginContainer>
    <Template name="root">
      List of cities:
      <ul>
        <TemplatePlaceholder name="city" params={{ title: 'New York' }} />
        <TemplatePlaceholder name="city" params={{ title: 'Paris' }} />
        <TemplatePlaceholder name="city" params={{ title: 'Tokyo' }} />
      </ul>
    </Template>
    <Template name="city">
      {({ title }) => (
        <li>{title}</li>
      )}
    </Template>
  </PluginContainer>
);

export default () => (
  <PluginHost>
    <Plugin />
  </PluginHost>
);

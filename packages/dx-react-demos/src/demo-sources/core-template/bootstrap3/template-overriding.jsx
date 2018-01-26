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
  </Plugin>
);

const Plugin2 = () => (
  <Plugin>
    <Template name="city">
      {({ title }) => (title === 'Paris' ? (
        <li><b>{title}</b></li>
      ) : (
        <TemplatePlaceholder />
      ))}
    </Template>
  </Plugin>
);

export default () => (
  <PluginHost>
    <Plugin1 />
    <Plugin2 />
  </PluginHost>
);

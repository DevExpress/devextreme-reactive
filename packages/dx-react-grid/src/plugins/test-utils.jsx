import React from 'react';
import {
  Getter,
  Action,
  Template,
  TemplatePlaceholder,
  PluginContainer,
} from '@devexpress/dx-react-core';

// remove when switch to node 8
const entries = object =>
  Object.keys(object)
    .reduce((acc, key) => [...acc, [key, object[key]]], []);

export const pluginDepsToComponents = (
  deps,
  depsOverrides = {},
) => (
  <PluginContainer>
    {deps.plugins && deps.plugins.map(plugin => (
      <PluginContainer
        pluginName={plugin}
        key={plugin}
      >
        <div />
      </PluginContainer>
    ))}
    {entries({ ...deps.getter, ...depsOverrides.getter })
      .map(([name, value]) => <Getter key={`getter_${name}`} name={name} value={value} />)}
    {entries({ ...deps.action, ...depsOverrides.action })
      .map(([name, action]) => <Action key={`action_${name}`} name={name} action={action} />)}
    {entries({ ...deps.template, ...depsOverrides.template })
      .map(([name, templateParams]) => (
        <Template key={`template_${name}`} name="root">
          <div>
            <TemplatePlaceholder name={name} params={templateParams} />
            <TemplatePlaceholder />
          </div>
        </Template>
      ))}
    <Template
      key="check"
      name="root"
      // eslint-disable-next-line no-param-reassign
      connectGetters={(getter) => { depsOverrides.computedGetter = getter; }}
      // eslint-disable-next-line no-param-reassign
      connectActions={(action) => { depsOverrides.computedAction = action; }}
    >
      {() => <TemplatePlaceholder />}
    </Template>
  </PluginContainer>
);

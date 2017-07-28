import React from 'react';
import {
  Getter,
  Action,
  Template,
  TemplatePlaceholder,
  PluginContainer,
} from '@devexpress/dx-react-core';

export const pluginDepsToComponents = (
  deps,
  depsOverrides = {},
) => (
  <PluginContainer>
    {Object.entries({ ...deps.getter, ...depsOverrides.getter })
      .map(([name, value]) => <Getter key={`getter_${name}`} name={name} value={value} />)}
    {Object.entries({ ...deps.action, ...depsOverrides.action })
      .map(([name, action]) => <Action key={`getter_${name}`} name={name} action={action} />)}
    {Object.entries({ ...deps.template, ...depsOverrides.template })
      .map(([name, templateParams]) => (
        <Template key={`getter_${name}`} name="root">
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
      connectGetters={getter => (depsOverrides.computedGetter = getter)}
      // eslint-disable-next-line no-param-reassign
      connectActions={getter => (depsOverrides.computedAction = getter)}
    >
      {() => <TemplatePlaceholder />}
    </Template>
  </PluginContainer>
);

import React from 'react';
import {
  Getter,
  Action,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
  PluginContainer,
} from '@devexpress/dx-react-core';

// remove when switch to node 8
const entries = object =>
  Object.keys(object)
    .reduce((acc, key) => [...acc, [key, object[key]]], []);

const computedEntries = object => Object.getOwnPropertyNames(object)
  .reduce((acc, key) => Object.assign(acc, { [key]: object[key] }), {});

let actionExecutor = () => {};
// eslint-disable-next-line react/prop-types
const ComputedStateContainer = ({ actions }) => (
  <button
    className="actionExecutor"
    onClick={() => actionExecutor(actions)}
  />
);

export const pluginDepsToComponents = (
  deps,
  depsOverrides = {},
) => (
  <PluginContainer>
    {[...(deps.plugins || []), ...(depsOverrides.plugins || [])].map(plugin => (
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
    <Template name="root">
      <TemplateConnector>
        {(getters, actions) => (
          <ComputedStateContainer
            getters={computedEntries(getters)}
            actions={computedEntries(actions)}
          />
        )}
      </TemplateConnector>
      <TemplatePlaceholder />
    </Template>
  </PluginContainer>
);

export const getComputedState = tree => tree.find(ComputedStateContainer).props().getters;

export const executeComputedAction = (tree, executor) => {
  actionExecutor = executor;
  tree.find(ComputedStateContainer).find('.actionExecutor').simulate('click');
};

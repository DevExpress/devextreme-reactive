import * as React from 'react';
import {
  Getter,
  Action,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
  Plugin,
} from '@devexpress/dx-react-core';

const computedEntries = object => Object.getOwnPropertyNames(object)
  .reduce((acc, key) => Object.assign(acc, { [key]: object[key] }), {});

let actionExecutor = () => {};
// eslint-disable-next-line react/prop-types
const ComputedStateContainer = ({ actions }) => (
  // eslint-disable-next-line jsx-a11y/control-has-associated-label
  <button
    type="button"
    className="actionExecutor"
    onClick={() => actionExecutor(actions)}
  />
);

export const pluginDepsToComponents = (
  deps,
  depsOverrides = {},
) => (
  <Plugin>
    {[...(deps.plugins || []), ...(depsOverrides.plugins || [])]
      .map(plugin => (
        <Plugin name={plugin} key={plugin}>
          <div />
        </Plugin>
      ))}
    {Object.entries({ ...deps.getter, ...depsOverrides.getter })
      .map(([name, value]) => <Getter key={`getter_${name}`} name={name} value={value} />)}
    {Object.entries({ ...deps.action, ...depsOverrides.action })
      .map(([name, action]) => <Action key={`action_${name}`} name={name} action={action} />)}
    {Object.entries({ ...deps.template, ...depsOverrides.template })
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
  </Plugin>
);

export const getComputedState = tree => tree.find(ComputedStateContainer).props().getters;

export const executeComputedAction = (tree, executor) => {
  actionExecutor = executor;
  tree.find(ComputedStateContainer).find('.actionExecutor').simulate('click');
};

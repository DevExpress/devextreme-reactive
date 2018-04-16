import {
  Getter,
  Action,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
  Plugin,
} from '@devexpress/dx-vue-core';

const computedEntries = object => Object.getOwnPropertyNames(object)
  .reduce((acc, key) => Object.assign(acc, { [key]: object[key] }), {});

let actionExecutor = () => {};
// eslint-disable-next-line react/prop-types
const ComputedStateContainer = {
  name: 'ComputedStateContainer',
  props: {
    getters: {},
    actions: {},
  },
  render() {
    const { actions } = this;
    return (
      <button
        class="actionExecutor"
        onClick={() => actionExecutor(actions)}
      />
    );
  },
};

export const PluginDepsToComponents = {
  props: {
    deps: {},
    depsOverrides: { default() { return {}; } },
  },
  render() {
    const {
      deps,
      depsOverrides,
    } = this;

    return (
      <Plugin>
        {[...(deps.plugins || []), ...(depsOverrides.plugins || [])]
          .map(plugin => <Plugin name={plugin} key={plugin}><div /></Plugin>)}
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
          <div>
            <TemplateConnector>
              {({ getters, actions }) => (
                <ComputedStateContainer
                  getters={computedEntries(getters)}
                  actions={computedEntries(actions)}
                />
              )}
            </TemplateConnector>
            <TemplatePlaceholder />
          </div>
        </Template>
      </Plugin>
    );
  },
};

export const getComputedState = tree => tree.find(ComputedStateContainer).props().getters;

export const executeComputedAction = (tree, executor) => {
  actionExecutor = executor;
  tree.find(ComputedStateContainer).find('.actionExecutor').trigger('click');
};

import {
  DxGetter,
  DxAction,
  DxTemplate,
  DxTemplatePlaceholder,
  DxTemplateConnector,
  DxPlugin,
} from '@devexpress/dx-vue-core';

const computedEntries = object => Object.getOwnPropertyNames(object)
  .reduce((acc, key) => Object.assign(acc, { [key]: object[key] }), {});

let actionExecutor = () => {};
// eslint-disable-next-line react/prop-types
const ComputedStateContainer = {
  name: 'ComputedStateContainer',
  props: {
    getters: {
      type: Object,
    },
    actions: {
      type: Object,
    },
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
    deps: {
      type: Object,
      default: () => ({}),
    },
    depsOverrides: {
      type: Object,
      default: () => ({}),
    },
  },
  render() {
    const {
      deps,
      depsOverrides,
    } = this;

    return (
      <DxPlugin>
        {[...(deps.plugins || []), ...(depsOverrides.plugins || [])]
          .map(plugin => <DxPlugin name={plugin} key={plugin}><div /></DxPlugin>)}
        {Object.entries({ ...deps.getter, ...depsOverrides.getter })
          .map(([name, value]) => <DxGetter key={`getter_${name}`} name={name} value={value} />)}
        {Object.entries({ ...deps.action, ...depsOverrides.action })
          .map(([name, action]) => <DxAction key={`action_${name}`} name={name} action={action} />)}
        {Object.entries({ ...deps.template, ...depsOverrides.template })
          .map(([name, templateParams]) => (
            <DxTemplate key={`template_${name}`} name="root">
              <div>
                <DxTemplatePlaceholder name={name} {...{ attrs: { ...templateParams } }} />
                <DxTemplatePlaceholder />
              </div>
            </DxTemplate>
          ))}
        <DxTemplate name="root">
          <div>
            <DxTemplateConnector>
              {({ getters, actions }) => (
                <ComputedStateContainer
                  getters={computedEntries(getters)}
                  actions={computedEntries(actions)}
                />
              )}
            </DxTemplateConnector>
            <DxTemplatePlaceholder />
          </div>
        </DxTemplate>
      </DxPlugin>
    );
  },
};

export const getComputedState = tree => tree.find(ComputedStateContainer).props().getters;

export const executeComputedAction = (tree, executor) => {
  actionExecutor = executor;
  tree.find(ComputedStateContainer).find('.actionExecutor').trigger('click');
};

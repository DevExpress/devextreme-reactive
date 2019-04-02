import * as React from 'react';

const makeBoundComponent = (Target, components, exposed: object) => {
  class Component extends React.PureComponent {
    static components: PluginComponents;

    render() {
      return <Target {...components} {...this.props} />;
    }
  }
  Component.components = Target.components;
  Object.assign(Component, exposed);
  return Component;
};

export type PluginComponents = { [key: string]: string };
export interface ITargetComponent {
  components: PluginComponents;
}
// type ITargetComponentStatic = new() => ITargetComponent;

/** @internal */
export const withComponents = components => (Target) => {
  const props = {};
  const exposed = {};
  const targetComponents = (Target as ITargetComponent).components;

  Object.entries(targetComponents).forEach(([fieldName, componentName]: [string, string]) => {
    const component = components[componentName];
    if (component && component !== Target[componentName]) {
      props[fieldName] = component;
    }
    exposed[componentName] = component || Target[componentName];
  });

  return Object.keys(props).length > 0
    ? makeBoundComponent(Target, props, exposed) : Target;
};

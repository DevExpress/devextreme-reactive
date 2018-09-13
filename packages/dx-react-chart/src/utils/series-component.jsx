import * as React from 'react';

const makeBoundComponent = (Target, components, exposed) => {
  class Component extends React.PureComponent {
    render() {
      return <Target {...components} {...this.props} />;
    }
  }
  Component.components = Target.components;
  Object.assign(Component, exposed);
  return Component;
};

export const withComponents = components => (Target) => {
  const props = {};
  const exposed = {};
  Object.entries(Target.components).forEach(([name, value]) => {
    const component = components[value.name];
    if (component) {
      props[name] = component;
    }
    exposed[value.exposedName] = component || Target[value.exposedName];
  });
  return Object.keys(props).length > 0
    ? makeBoundComponent(Target, props, exposed) : Target;
};

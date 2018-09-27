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
  Object.entries(Target.components).forEach(([fieldName, componentName]) => {
    const component = components[componentName];
    if (component && component !== Target[componentName]) {
      props[fieldName] = component;
    }
    exposed[componentName] = component || Target[componentName];
  });
  return Object.keys(props).length > 0
    ? makeBoundComponent(Target, props, exposed) : Target;
};

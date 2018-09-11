import React from 'react';

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

export const bindSeriesComponents = (Target, seriesComponents) => {
  const components = {};
  const exposed = {};
  Object.entries(Target.components).forEach(([name, value]) => {
    const component = seriesComponents[value.name];
    if (component) {
      components[name] = component;
    }
    exposed[value.exposedName] = component || Target[value.exposedName];
  });
  return Object.keys(components).length > 0
    ? makeBoundComponent(Target, components, exposed) : Target;
};

export const batchBindSeriesComponents = (targets, seriesComponents) => {
  const result = {};
  Object.keys(targets).forEach((name) => {
    result[name] = bindSeriesComponents(targets[name], seriesComponents);
  });
  return result;
};

import React from 'react';

export const bindSeriesComponents = (Target, storage) => {
  const components = {};
  const exposed = {};
  Object.entries(Target.components).forEach(([name, value]) => {
    const component = storage[value.name];
    components[name] = component;
    exposed[value.exposedName] = component;
  });
  class Component extends React.PureComponent {
    render() {
      return <Target {...components} {...this.props} />;
    }
  }
  Component.components = Target.components;
  Object.assign(Component, exposed);
  return Component;
};

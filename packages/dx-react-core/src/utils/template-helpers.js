import React from 'react';

export const combineTemplates = (userTemplate = () => undefined, defaultTemplate) => (props) => {
  let result = userTemplate(props);
  if (result === undefined) {
    result = defaultTemplate(props);
  }
  return result;
};

export const createRenderComponent = () => {
  let storedRender = () => null;
  const components = new Set();
  class RenderComponent extends React.Component {
    componentWillMount() {
      components.add(this);
    }
    componentWillUnmount() {
      components.delete(this);
    }
    render() {
      return storedRender(this.props);
    }
  }
  return (render) => {
    storedRender = render;
    Array.from(components.values())
      .forEach(component => component.forceUpdate());
    return RenderComponent;
  };
};

import * as React from 'react';

export const connectProps = (Component, getAdditionalProps) => {
  let storedAdditionalProps = getAdditionalProps();
  const components = new Set();
  class RenderComponent extends React.PureComponent {
    componentDidMount() {
      components.add(this);
    }

    componentWillUnmount() {
      components.delete(this);
    }

    render() {
      return <Component {...this.props} {...storedAdditionalProps} />;
    }
  }
  RenderComponent.update = () => {
    storedAdditionalProps = getAdditionalProps();
    Array.from(components.values()).forEach(component => component.forceUpdate());
  };
  return RenderComponent;
};

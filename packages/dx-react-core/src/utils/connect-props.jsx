import * as React from 'react';

export const connectProps = (WrappedComponent, getAdditionalProps) => {
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
      return <WrappedComponent {...this.props} {...storedAdditionalProps} />;
    }
  }
  RenderComponent.update = () => {
    storedAdditionalProps = getAdditionalProps();
    Array.from(components.values()).forEach(component => component.forceUpdate());
  };
  return RenderComponent;
};

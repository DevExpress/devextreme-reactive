import * as React from 'react';

type RenderComponentProps = {
  update: () => void;
}
type connectPropsType = (cmp, props) => any;

export const connectProps: connectPropsType  = (WrappedComponent, getAdditionalProps) => {
  let storedAdditionalProps = getAdditionalProps();
  const components = new Set();
  class RenderComponent extends React.PureComponent<RenderComponentProps> {
    static update: () => void;

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

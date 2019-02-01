import * as React from 'react';

type RenderComponentProps = {
  update: () => void;
};
type connectPropsType = (
  WrappedComponent: React.ComponentType<any>, getAdditionalProps: () => object,
) => typeof WrappedComponent & { update(): void };

/*** A function that creates a new component that allows you to pass additional properties
 * to the wrapped component.
 */
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

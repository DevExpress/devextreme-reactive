import * as React from 'react';
import { create } from 'react-test-renderer';
import { connectProps } from './connect-props';

describe('connectProps', () => {
  const WrappedComponent = () => <span />;

  it('should pass props to a wrapped component', () => {
    const EnhancedComponent = connectProps(WrappedComponent, () => ({}));
    const tree = create(<EnhancedComponent a={1} />);

    expect(tree.root.findByType(WrappedComponent).props.a)
      .toBe(1);
  });

  it('should pass additional props to a wrapped component', () => {
    const EnhancedComponent = connectProps(WrappedComponent, () => ({ a: 2, b: 1 }));
    const tree = create(<EnhancedComponent a={1} />);

    expect(tree.root.findByType(WrappedComponent).props)
      .toEqual({ a: 2, b: 1 });
  });

  it('should update a wrapped component', () => {
    const props = { a: 1 };
    const getAdditionalProps = jest.fn();
    getAdditionalProps.mockImplementation(() => props);

    const EnhancedComponent = connectProps(WrappedComponent, getAdditionalProps);
    const tree = create(<EnhancedComponent />);
    props.a = 2;

    EnhancedComponent.update();
    tree.update(<EnhancedComponent />);

    expect(tree.root.findByType(WrappedComponent).props.a).toBe(2);
    expect(getAdditionalProps.mock.calls)
      .toHaveLength(2);
  });
});

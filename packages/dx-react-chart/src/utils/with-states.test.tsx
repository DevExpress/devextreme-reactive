import * as React from 'react';
import { mount } from 'enzyme';
import { withStates } from './with-states';

describe('#withStates', () => {
  const BaseComponent = () => null;
  const OtherComponent = () => null;
  const TestComponent = withStates({
    state1: props => ({
      ...props,
      tag: 'state-1',
    }),
    state2: props => (
      <OtherComponent {...props} tag="state-2" />
    ),
  })(BaseComponent) as any;

  it('should return original component by default', () => {
    const tree = mount(<TestComponent a={1} b={2} />);

    expect(tree.find(BaseComponent).props()).toEqual({ a: 1, b: 2 });
  });

  it('should apply state props', () => {
    const tree = mount(<TestComponent a={1} b={2} state="state1" />);

    expect(tree.find(BaseComponent).props()).toEqual({ a: 1, b: 2, tag: 'state-1' });
  });

  it('should return react node as-is', () => {
    const tree = mount(<TestComponent a={1} b={2} state="state2" />);

    expect(tree.find(BaseComponent).length).toEqual(0);
    expect(tree.find(OtherComponent).props()).toEqual({ a: 1, b: 2, tag: 'state-2' });
  });
});

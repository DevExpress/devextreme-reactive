import * as React from 'react';
import { mount } from 'enzyme';
import { withComponents } from './series-component';

describe('withComponents', () => {
  const Tester = () => null;
  Tester.components = {
    component1: {
      name: 'Component1',
      exposedName: 'Tester1',
    },
    component2: {
      name: 'Component2',
      exposedName: 'Tester2',
    },
  };
  const TestComponent1 = () => null;
  const TestComponent2 = () => null;

  it('should add bound components to props', () => {
    const BoundTester = withComponents({
      Component1: TestComponent1,
      Component2: TestComponent2,
    })(Tester);

    const tree = mount(<BoundTester prop1={1} />);

    expect(tree.find(Tester).props()).toEqual({
      prop1: 1,
      component1: TestComponent1,
      component2: TestComponent2,
    });
  });

  it('should tolerate absence of some components', () => {
    const BoundTester = withComponents({
      Component2: TestComponent2,
    })(Tester);

    const tree = mount(<BoundTester prop1={1} />);

    expect(tree.find(Tester).props()).toEqual({
      prop1: 1,
      component2: TestComponent2,
    });
  });

  it('should return original if there are no valid components', () => {
    const BoundTester = withComponents({})(Tester);

    expect(BoundTester).toEqual(Tester);
  });

  it('should expose bound components', () => {
    const BoundTester = withComponents({
      Component1: TestComponent1,
      Component2: TestComponent2,
    })(Tester);

    expect(BoundTester.Tester1).toEqual(TestComponent1);
    expect(BoundTester.Tester2).toEqual(TestComponent2);
  });

  it('should attempt to preserve already exposed components', () => {
    const BoundTester1 = withComponents({
      Component1: TestComponent1,
      Component2: TestComponent2,
    })(Tester);
    const Component3 = () => null;

    const BoundTester2 = withComponents({
      Component1: Component3,
    })(BoundTester1);

    expect(BoundTester2.Tester1).toEqual(Component3);
    expect(BoundTester2.Tester2).toEqual(TestComponent2);
  });

  it('should pass along components definition', () => {
    const BoundTester = withComponents({
      Component1: TestComponent1,
      Component2: TestComponent2,
    })(Tester);

    expect(BoundTester.components).toEqual(Tester.components);
  });
});

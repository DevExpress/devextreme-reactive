import 'jsdom-global/register';
import * as React from 'react';
import { create } from 'react-test-renderer';
import { withComponents } from './with-components';

describe('withComponents', () => {
  const Tester = () => null;
  Tester.components = {
    component1: 'Component1',
    component2: 'Component2',
  };
  const TestComponent1 = () => null;
  const TestComponent2 = () => null;

  it('should add bound components to props and exposed them as static fields', () => {
    const BoundTester = withComponents({
      Component1: TestComponent1,
      Component2: TestComponent2,
    })(Tester);
    const otherProps = { prop1: 1, prop2: 2 };

    const tree = create(<BoundTester {...otherProps} />);

    expect(tree.root.findByType(Tester).props).toEqual({
      component1: TestComponent1,
      component2: TestComponent2,
      ...otherProps,
    });
    expect(BoundTester.Component1).toEqual(TestComponent1);
    expect(BoundTester.Component2).toEqual(TestComponent2);
  });

  it('should tolerate absence of some components', () => {
    const BoundTester = withComponents({
      Component2: TestComponent2,
    })(Tester);
    const otherProps = { prop1: 1, prop2: 2 };

    const tree = create(<BoundTester {...otherProps} />);

    expect(tree.root.findByType(Tester).props).toEqual({
      component2: TestComponent2,
      ...otherProps,
    });
    expect(BoundTester.Component1).toBeUndefined();
  });

  it('should override existing bindings', () => {
    const BoundTester1 = withComponents({
      Component1: TestComponent1,
      Component2: TestComponent2,
    })(Tester);
    const TestComponent3 = () => null;
    const BoundTester2 = withComponents({
      Component1: TestComponent3,
    })(BoundTester1);

    const tree = create(<BoundTester2 />);

    expect(tree.root.findByType(Tester).props).toEqual({
      component1: TestComponent3,
      component2: TestComponent2,
    });
    expect(BoundTester2.Component1).toEqual(TestComponent3);
  });

  it('should return original if there are no valid components', () => {
    const BoundTester = withComponents({})(Tester);

    expect(BoundTester).toEqual(Tester);
  });

  it('should return original if there are no actual changes', () => {
    const BoundTester1 = withComponents({
      Component1: TestComponent1,
      Component2: TestComponent2,
    })(Tester);
    const BoundTester2 = withComponents({
      Component1: TestComponent1,
      Component2: TestComponent2,
    })(BoundTester1);

    expect(BoundTester2).toEqual(BoundTester1);
  });

  it('should pass along components definition', () => {
    const BoundTester = withComponents({
      Component1: TestComponent1,
      Component2: TestComponent2,
    })(Tester);

    expect(BoundTester.components).toEqual(Tester.components);
  });
});

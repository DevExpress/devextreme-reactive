import * as React from 'react';
import { mount } from 'enzyme';
import { withPatchedProps } from './patch-props';

describe('withPatchedProps', () => {
  const Tester = () => null;

  it('should substitute props', () => {
    const PatchedTester = withPatchedProps(({ a, b, ...restProps }) => ({
      ...restProps,
      c: a + b,
    }) as any)(Tester) as any;

    const tree = mount(<PatchedTester a="a" b="b" c="c" d="d" />);

    expect(tree.find(Tester).props()).toEqual({
      c: 'ab',
      d: 'd',
    });
  });

  it('should replace props', () => {
    const PatchedTester = withPatchedProps(({ a, b }) => ({
      c: a + b,
    }) as any)(Tester) as any;

    const tree = mount(<PatchedTester a="a" b="b" c="c" d="d" />);

    expect(tree.find(Tester).props()).toEqual({
      c: 'ab',
    });
  });
});

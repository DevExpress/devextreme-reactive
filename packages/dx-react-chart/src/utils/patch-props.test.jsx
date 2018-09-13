import * as React from 'react';
import { mount } from 'enzyme';
import { patchProps } from './patch-props';

describe('patchProps', () => {
  const Tester = () => null;

  it('should substitute props', () => {
    const PatchedTester = patchProps(({ a, b, ...restProps }) => ({
      ...restProps,
      c: a + b,
    }))(Tester);

    const tree = mount(<PatchedTester a="a" b="b" c="c" d="d" />);

    expect(tree.find(Tester).props()).toEqual({
      c: 'ab',
      d: 'd',
    });
  });

  it('should replace props', () => {
    const PatchedTester = patchProps(({ a, b }) => ({
      c: a + b,
    }))(Tester);

    const tree = mount(<PatchedTester a="a" b="b" c="c" d="d" />);

    expect(tree.find(Tester).props()).toEqual({
      c: 'ab',
    });
  });
});

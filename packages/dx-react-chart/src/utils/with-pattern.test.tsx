import * as React from 'react';
import { mount } from 'enzyme';
import { Pattern } from '../templates/pattern';
import { withPattern } from './with-pattern';

jest.mock('../templates/pattern', () => ({
  Pattern: () => null,
}));

describe('#withPattern', () => {
  const BaseComponent = () => null;
  const TestComponent = withPattern<any>(
    ({ x, y }) => `${x}-${y}`,
    { a: 1, b: 2 },
  )(BaseComponent);

  it('should render base element and pattern', () => {
    const tree = mount(<TestComponent x={11} y={12} color="c1" />);

    expect(tree.find(BaseComponent).props()).toEqual({ x: 11, y: 12, color: 'url(#11-12)' });
    expect(tree.find(Pattern).props()).toEqual({
      a: 1, b: 2, id: '11-12', color: 'c1',
    });
  });
});

import * as React from 'react';
import { shallow } from 'enzyme';
import { withStates } from '../../utils/with-states';
import { Path } from './path';

jest.mock('@devexpress/dx-chart-core', () => ({
  HOVERED: 'test_hovered',
  SELECTED: 'test_selected',
}));

jest.mock('../../utils/with-states', () => ({
  withStates: jest.fn().mockReturnValue(x => x),
}));

describe('Path', () => {
  const defaultProps = {
    path: jest.fn(value => value.join('-')),
    coordinates: [1, 2, 3],
    index: 1,
    color: 'red',
    scales: { tag: 'test-scales' },
    rotated: true,
    getAnimatedStyle: jest.fn(style => style),
    clipPathId: 'clipPathId',
  };

  it('should render root element', () => {
    const tree = shallow((
      <Path
        {...(defaultProps as any)}
      />
    ));

    expect(tree.find('path').props()).toEqual({
      d: '1-2-3',
      fill: 'none',
      strokeWidth: 2,
      stroke: 'red',
      clipPath: 'url(#clipPathId)',
    });
    expect(defaultProps.path).toBeCalledWith(defaultProps.coordinates);
  });

  it('should apply custom styles if any', () => {
    const customStyle = {
      stroke: 'red',
      strokeWidth: '2px',
    };
    const tree = shallow((
      <Path
        {...(defaultProps as any)}
        style={customStyle}
      />
    ));
    const { style } = tree.find('path').props();

    expect(style).toEqual(customStyle);
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow((
      <Path {...(defaultProps as any)} customProperty />
    ));
    const { customProperty } = tree.find('path').props() as any;

    expect(customProperty).toBeTruthy();
  });

  it('should have hovered and selected states', () => {
    expect(withStates).toBeCalledWith({
      test_hovered: expect.any(Function),
      test_selected: expect.any(Function),
    });
    expect((withStates as jest.Mock).mock.calls[0][0].test_hovered({ a: 1, b: 2 }))
      .toEqual({ a: 1, b: 2, strokeWidth: 4 });
    expect((withStates as jest.Mock).mock.calls[0][0].test_selected({ a: 1, b: 2 }))
      .toEqual({ a: 1, b: 2, strokeWidth: 4 });
  });
});

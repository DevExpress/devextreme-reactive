import * as React from 'react';
import { shallow } from 'enzyme';
import { withStates } from '../../utils/with-states';
import { withPattern } from '../../utils/with-pattern';
import { Area } from './area';

jest.mock('@devexpress/dx-chart-core', () => ({
  HOVERED: 'test_hovered',
  SELECTED: 'test_selected',
}));

jest.mock('../../utils/with-states', () => ({
  withStates: jest.fn().mockReturnValue(x => x),
}));
jest.mock('../../utils/with-pattern', () => ({
  withPattern: jest.fn().mockReturnValue(x => x),
}));

describe('Area', () => {
  const defaultProps = {
    path: value => value.join('-'),
    coordinates: [1, 2, 3],
    index: 1,
    color: 'red',
    scales: { tag: 'test-scales' },
    getAnimatedStyle: jest.fn(style => style),
  };

  it('should render root element', () => {
    const tree = shallow((
      <Area
        {...defaultProps}
      />
    ));

    expect(tree.find('path').props()).toEqual({
      d: '1-2-3',
      fill: 'red',
      opacity: 0.5,
    });
  });

  it('should apply custom styles if any', () => {
    const customStyle = {
      stroke: 'red',
      strokeWidth: '2px',
    };
    const tree = shallow((
      <Area
        {...defaultProps}
        style={customStyle}
      />
    ));
    const { style } = tree.find('path').props();

    expect(style).toEqual(customStyle);
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow((
      <Area {...defaultProps} customProperty />
    ));
    const { customProperty } = tree.find('path').props();

    expect(customProperty).toBeTruthy();
  });

  it('should have hovered and selected states', () => {
    expect(withStates).toBeCalledWith({
      test_hovered: Area,
      test_selected: Area,
    });
  });

  it('should use patterns', () => {
    expect(withPattern.mock.calls).toEqual([
      [expect.any(Function), { opacity: 0.75 }],
      [expect.any(Function), { opacity: 0.5 }],
    ]);
    expect(withPattern.mock.calls[0][0]({ index: 2 })).toEqual('series-2-hover');
    expect(withPattern.mock.calls[1][0]({ index: 3 })).toEqual('series-3-selection');
  });
});

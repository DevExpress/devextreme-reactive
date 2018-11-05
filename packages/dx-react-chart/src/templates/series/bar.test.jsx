import * as React from 'react';
import { shallow } from 'enzyme';
import { withStates } from '../../utils/with-states';
import { withPattern } from '../../utils/with-pattern';
import { Bar } from './bar';

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

describe('Bar', () => {
  const defaultProps = {
    x: 1,
    y: 2,
    width: 10,
    height: 20,
    color: 'red',
    value: 15,
  };

  it('should render root element', () => {
    const tree = shallow((
      <Bar
        {...defaultProps}
      />
    ));

    expect(tree.find('rect').props()).toEqual({
      x: 1,
      y: 2,
      width: 10,
      height: 20,
      fill: 'red',
    });
  });

  it('should apply custom styles if any', () => {
    const customStyle = {
      stroke: 'red',
      strokeWidth: '2px',
    };
    const tree = shallow((
      <Bar
        {...defaultProps}
        style={customStyle}
      />
    ));
    const { style } = tree.find('rect').props();

    expect(style).toEqual(customStyle);
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow((
      <Bar {...defaultProps} customProperty />
    ));
    const { customProperty } = tree.find('rect').props();

    expect(customProperty).toBeTruthy();
  });

  it('should have hovered and selected states', () => {
    expect(withStates).toBeCalledWith({
      test_hovered: Bar,
      test_selected: Bar,
    });
  });

  it('should use patterns', () => {
    expect(withPattern.mock.calls).toEqual([
      [expect.any(Function), { opacity: 0.75 }],
      [expect.any(Function), { opacity: 0.5 }],
    ]);
    expect(withPattern.mock.calls[0][0]({ seriesIndex: 1, index: 2 }))
      .toEqual('series-1-point-2-hover');
    expect(withPattern.mock.calls[1][0]({ seriesIndex: 2, index: 3 }))
      .toEqual('series-2-point-3-selection');
  });
});

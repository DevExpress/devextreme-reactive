import * as React from 'react';
import { shallow } from 'enzyme';
import { withStates } from '../../utils/with-states';
import { withPattern } from '../../utils/with-pattern';
import { withAnimation } from '../../utils/with-animation';
import { Area } from './area';
import {
  getPathStart, processAreaAnimation, isCoordinatesChanged,
} from '@devexpress/dx-chart-core';

jest.mock('@devexpress/dx-chart-core', () => ({
  HOVERED: 'test_hovered',
  SELECTED: 'test_selected',
  isCoordinatesChanged: jest.fn(),
  getPathStart: jest.fn(),
  processAreaAnimation: jest.fn(),
}));

jest.mock('../../utils/with-states', () => ({
  withStates: jest.fn().mockReturnValue(x => x),
}));
jest.mock('../../utils/with-pattern', () => ({
  withPattern: jest.fn().mockReturnValue(x => x),
}));
jest.mock('../../utils/with-animation', () => ({
  withAnimation: jest.fn().mockReturnValue(x => x),
}));

describe('Area', () => {
  const defaultProps = {
    path: jest.fn(value => value.join('-')),
    coordinates: [1, 2, 3],
    index: 1,
    color: 'red',
    scales: { tag: 'test-scales' },
    rotated: true,
    clipPathId: 'clipPathId',
    style: { tag: 'test-style' },
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
      clipPath: 'url(#clipPathId)',
      style: { tag: 'test-style' },
    });
    expect(defaultProps.path).toBeCalledWith(defaultProps.coordinates);
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
    const { customProperty } = tree.find('path').props() as any;

    expect(customProperty).toBeTruthy();
  });

  it('should have hovered and selected states', () => {
    expect(withStates).toBeCalledWith({
      test_hovered: Area,
      test_selected: Area,
    });
  });

  it('should use patterns', () => {
    expect((withPattern as jest.Mock).mock.calls).toEqual([
      [expect.any(Function), { opacity: 0.75 }],
      [expect.any(Function), { opacity: 0.5 }],
    ]);
    expect((withPattern as jest.Mock).mock.calls[0][0]({ index: 2 })).toEqual('series-2-color-undefined-hover');
    expect((withPattern as jest.Mock).mock.calls[1][0]({ index: 3 })).toEqual('series-3-color-undefined-selection');
  });

  it('should animate', () => {
    expect(withAnimation)
    .toBeCalledWith(processAreaAnimation, expect.any(Function), getPathStart, isCoordinatesChanged);
  });

  it('should update props', () => {
    const tree = shallow((
      <Area
        {...defaultProps}
      />
    ));

    tree.setProps({ ...defaultProps, coordinates: [4, 5, 6] });

    expect(tree.find('path').props()).toEqual({
      d: '4-5-6',
      fill: 'red',
      opacity: 0.5,
      clipPath: 'url(#clipPathId)',
      style: { tag: 'test-style' },
    });
  });
});

import * as React from 'react';
import { shallow } from 'enzyme';
import { withStates } from '../../utils/with-states';
import { Point } from './point';

jest.mock('@devexpress/dx-chart-core', () => ({
  HOVERED: 'test_hovered',
  SELECTED: 'test_selected',
}));

jest.mock('../../utils/with-states', () => ({
  withStates: jest.fn().mockReturnValue(x => x),
}));

describe('Point', () => {
  const defaultProps = {
    x: 1,
    y: 2,
    d: 'M11 11',
    value: 10,
    color: 'red',
  };

  it('should render path element', () => {
    const tree = shallow((
      <Point
        {...defaultProps}
      />
    ));

    expect(tree.find('path').props()).toEqual({
      d: 'M11 11',
      fill: 'red',
      stroke: 'none',
      transform: 'translate(1 2)',
    });
  });

  it('should render path element with custom styles', () => {
    const customStyle = {
      stroke: 'orange',
      fill: 'green',
    };
    const tree = shallow((
      <Point
        {...defaultProps}
        style={customStyle}
      />
    ));
    const { style } = tree.find('path').props();
    expect(style).toEqual(customStyle);
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow((
      <Point {...defaultProps} customProperty />
    ));
    const { customProperty } = tree.find('path').props();

    expect(customProperty).toBeTruthy();
  });

  it('should have hovered and selected states', () => {
    expect(withStates).toBeCalledWith({
      test_hovered: expect.any(Function),
      test_selected: expect.any(Function),
    });
    expect(withStates.mock.calls[0][0].test_hovered({ a: 1, b: 2, color: 'green' })).toEqual({
      a: 1, b: 2, strokeWidth: 4, fill: 'none', stroke: 'green',
    });
    expect(withStates.mock.calls[0][0].test_selected({ a: 1, b: 2, color: 'blue' })).toEqual({
      a: 1, b: 2, strokeWidth: 4, fill: 'none', stroke: 'blue',
    });
  });
});

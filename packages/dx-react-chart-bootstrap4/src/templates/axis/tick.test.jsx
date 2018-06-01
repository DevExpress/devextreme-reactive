import * as React from 'react';
import { shallow } from 'enzyme';
import { Tick } from './tick';

const defaultProps = {
  x1: 1, x2: 2, y1: 3, y2: 4,
};

describe('Tick', () => {
  it('should render line with correct coordinates', () => {
    const { d } = shallow((
      <Tick {...defaultProps} />
    )).find('path').props();

    expect(d).toBe('M 1 3 L 2 4');
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <Tick {...defaultProps} className="custom-class" />
    ));

    expect(tree.is('.custom-class.dx-c-bs4-stroke-current-color.dx-c-bs4-crisp-edges.dx-c-bs4-axis-opacity'))
      .toBeTruthy();
  });


  it('should pass the rest property to the root element', () => {
    const tree = shallow(<Tick {...defaultProps} customProperty />);
    const { customProperty } = tree.find('path').props();
    expect(customProperty).toBeTruthy();
  });
});

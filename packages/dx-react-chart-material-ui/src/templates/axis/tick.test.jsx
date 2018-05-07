import * as React from 'react';
import { createShallow, getClasses } from 'material-ui/test-utils';
import { Tick } from './tick';

const defaultProps = {
  x1: 1, x2: 2, y1: 3, y2: 4,
};
const shallow = createShallow({ dive: true });
const classes = getClasses(<Tick {...defaultProps} />);

describe('Tick', () => {
  it('should render line with correct coordinates', () => {
    const {
      x1, x2, y1, y2,
    } = shallow((
      <Tick {...defaultProps} />
    )).find('line').props();

    expect(x1).toBe(1);
    expect(x2).toBe(2);
    expect(y1).toBe(3);
    expect(y2).toBe(4);
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <Tick {...defaultProps} className="custom-class" />
    ));

    expect(tree.is(`.${classes.root}`))
      .toBeTruthy();
    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow(<Tick {...defaultProps} customProperty />);
    const { customProperty } = tree.find('line').props();
    expect(customProperty).toBeTruthy();
  });
});

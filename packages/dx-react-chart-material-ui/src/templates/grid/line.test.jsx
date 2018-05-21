import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Line } from './line';

describe('Line', () => {
  const defaultProps = {
    x1: 1, x2: 3, y1: 2, y2: 4,
  };
  const shallow = createShallow({ dive: true });
  const classes = getClasses(<Line {...defaultProps} />);
  it('should render line', () => {
    const {
      x1, y1, x2, y2,
    } = shallow((
      <Line {...defaultProps} />
    )).find('line').props();

    expect(x1).toBe(1);
    expect(y1).toBe(2);
    expect(x2).toBe(3);
    expect(y2).toBe(4);
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <Line {...defaultProps} className="custom-class" />
    ));

    expect(tree.is(`.${classes.root}.custom-class`))
      .toBeTruthy();
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow(<Line {...defaultProps} customProperty />);
    const { customProperty } = tree.find('line').props();
    expect(customProperty).toBeTruthy();
  });
});

import * as React from 'react';
import { createShallow, getClasses } from 'material-ui/test-utils';
import { Line } from './line';

const defaultProps = {
  width: 100,
  height: 100,
  orientation: 'horizontal',
};
describe('Line', () => {
  const shallow = createShallow({ dive: true });
  const classes = getClasses(<Line {...defaultProps} />);

  it('should render line', () => {
    const {
      x1, y1, x2, y2,
    } = shallow((
      <Line {...defaultProps} />
    )).find('line').props();

    expect(x1).toBe(0);
    expect(y1).toBe(0);
    expect(x2).toBe(100);
    expect(y2).toBe(0);
  });

  it('should render line. Vertical', () => {
    const {
      x1, y1, x2, y2,
    } = shallow((
      <Line
        {...defaultProps}
        orientation="vertical"
      />
    )).find('line').props();

    expect(x1).toBe(0);
    expect(y1).toBe(0);
    expect(x2).toBe(0);
    expect(y2).toBe(100);
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

import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
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
    const { d } = shallow((
      <Line {...defaultProps} />
    )).find('path').props();

    expect(d).toBe('M 0 0 L 100 0');
  });

  it('should render line. Vertical', () => {
    const { d } = shallow((
      <Line
        {...defaultProps}
        orientation="vertical"
      />
    )).find('path').props();

    expect(d).toBe('M 0 0 L 0 100');
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
    const { customProperty } = tree.find('path').props();
    expect(customProperty).toBeTruthy();
  });
});

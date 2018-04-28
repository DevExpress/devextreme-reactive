import * as React from 'react';
import { createShallow, getClasses } from 'material-ui/test-utils';
import { Label } from './label';

const defaultProps = {
  x: 1, y: 2, text: 'a', dominantBaseline: 'middle', textAnchor: 'end',
};

describe('Label', () => {
  const shallow = createShallow({ dive: true });
  const classes = getClasses(<Label {...defaultProps} />);

  it('should render text', () => {
    const tree = shallow((
      <Label {...defaultProps} />
    ));

    expect(tree.text()).toBe('a');
  });

  it('should render text tag with correct props', () => {
    const tree = shallow((
      <Label {...defaultProps} />
    ));

    const {
      x, y, dominantBaseline, textAnchor,
    } = tree.find('text').props();
    expect(x).toBe(1);
    expect(y).toBe(2);
    expect(dominantBaseline).toBe('middle');
    expect(textAnchor).toBe('end');
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <Label {...defaultProps} className="custom-class" />
    ));

    expect(tree.is(`.${classes.root}`))
      .toBeTruthy();
    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });
});

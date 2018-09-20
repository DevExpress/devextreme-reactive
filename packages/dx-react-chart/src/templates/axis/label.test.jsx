import * as React from 'react';
import { shallow } from 'enzyme';
import { Label } from './label';

const defaultProps = {
  x: 1,
  y: 2,
  text: 'a',
  dominantBaseline: 'middle',
  textAnchor: 'end',
};

describe('Label', () => {
  it('should render text', () => {
    const tree = shallow(<Label {...defaultProps} />);

    const {
      x, y, dominantBaseline, textAnchor,
    } = tree.find('text').props();
    expect(x).toBe(1);
    expect(y).toBe(2);
    expect(dominantBaseline).toBe('middle');
    expect(textAnchor).toBe('end');
    expect(tree.text()).toBe('a');
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow(<Label {...defaultProps} customProperty />);
    const { customProperty } = tree.find('text').props();

    expect(customProperty)
      .toBeTruthy();
  });
});

import * as React from 'react';
import { shallow } from 'enzyme';
import { Label } from './label';

const defaultProps = {
  x: 1,
  y: 2,
  text: 'a',
  dy: '1em',
  textAnchor: 'end',
};

describe('Label', () => {
  it('should render text', () => {
    const tree = shallow(<Label {...defaultProps} />);

    const {
      x, y, dy, textAnchor,
    } = tree.find('text').props();
    expect(x).toBe(1);
    expect(y).toBe(2);
    expect(dy).toBe('1em');
    expect(textAnchor).toBe('end');
    expect(tree.text()).toBe('a');
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow(<Label {...defaultProps} customProperty />);
    const { customProperty } = tree.find('text').props() as any;

    expect(customProperty)
      .toBeTruthy();
  });
});

import * as React from 'react';
import { shallow } from 'enzyme';
import { Label } from './label';

const defaultProps = {
  x: 1,
  y: 2,
  dominantBaseline: 'middle',
  textAnchor: 'end',
};

describe('Label', () => {
  it('should render text', () => {
    const tree = shallow(<Label {...defaultProps}>text</Label>);

    const {
      x, y, dominantBaseline, textAnchor,
    } = tree.find('text').props();
    expect(x).toBe(1);
    expect(y).toBe(2);
    expect(dominantBaseline).toBe('middle');
    expect(textAnchor).toBe('end');
    expect(tree.text()).toBe('text');
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow(<Label {...defaultProps} customProperty>text</Label>);
    const { customProperty } = tree.find('text').props() as any;

    expect(customProperty)
      .toBeTruthy();
  });
});

import * as React from 'react';
import { shallow } from 'enzyme';
import { Target } from './target';

const emptyFunc = () => {};

const defaultProps = {
  d: 'd-attribute',
  x: 10,
  y: 20,
  componentRef: emptyFunc as any,
};

describe('Target', () => {
  it('should render target', () => {
    const tree = shallow(<Target {...defaultProps} />);
    const {
      transform, d, fill,
    } = tree.find('path').props();
    expect(transform).toBe('translate(10 20)');
    expect(d).toBe('d-attribute');
    expect(fill).toBe('none');
  });
});

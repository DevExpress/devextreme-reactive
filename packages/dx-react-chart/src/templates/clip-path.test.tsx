import * as React from 'react';
import { shallow } from 'enzyme';
import { ClipPath } from './clip-path';

describe('Clip Path', () => {
  const defaultProps = {
    id: 'defaultId',
    width: 400,
    height: 500,
  };

  it('should create clipPath', () => {
    const tree = shallow(<ClipPath {...defaultProps} />);

    expect(tree.find('defs')).toBeTruthy();
    expect(tree.find('clipPath').props().id).toBe('defaultId');
    expect(tree.find('rect').props()).toEqual({
      x: -1,
      y: -1,
      width: 402,
      height: 502,
    });
  });
});

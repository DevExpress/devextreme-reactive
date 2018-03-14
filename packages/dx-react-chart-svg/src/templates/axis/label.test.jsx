import * as React from 'react';
import { shallow } from 'enzyme';
import { Label } from './label';

describe('Label', () => {
  it('should render text', () => {
    const tree = shallow((
      <Label
        x={1}
        y={2}
        text="a"
      />
    ));

    const { x, y } = tree.find('text').props();
    expect(x).toBe(1);
    expect(y).toBe(2);
    expect(tree.text()).toBe('a');
  });
});

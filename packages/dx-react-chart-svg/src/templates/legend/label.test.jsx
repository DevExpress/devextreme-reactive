import * as React from 'react';
import { shallow } from 'enzyme';
import { Label } from './label';

describe('Label', () => {
  it('should render text', () => {
    const tree = shallow((
      <Label
        text="a"
        margin={5}
      />
    ));

    const {
      style,
    } = tree.find('span').props();
    expect(tree.text()).toBe('a');
    expect(style.margin).toBe(5);
  });
});

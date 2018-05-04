import * as React from 'react';
import { shallow } from 'enzyme';
import { Label } from './label';

describe('Label', () => {
  it('should render text', () => {
    const tree = shallow((
      <Label text="a" />
    ));

    expect(tree.text()).toBe('a');
  });
});

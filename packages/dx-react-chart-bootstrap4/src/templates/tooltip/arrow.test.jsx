import * as React from 'react';
import { shallow } from 'enzyme';
import { Arrow } from './arrow';

describe('Arrow', () => {
  it('should render content', () => {
    const tree = shallow((
      <Arrow />
    ));

    expect(tree.find('div').exists()).toBeTruthy();
  });
});

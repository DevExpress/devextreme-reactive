import * as React from 'react';
import { shallow } from 'enzyme';
import { Sheet } from './sheet';

describe('Sheet', () => {
  it('should render content', () => {
    const tree = shallow((
      <Sheet />
    ));

    expect(tree.find('div').exists()).toBeTruthy();
  });
});

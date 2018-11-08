import * as React from 'react';
import { shallow } from 'enzyme';
import { Icon } from './icon';

describe('Icon', () => {
  it('should assign className to the root element', () => {
    const tree = shallow((
      <Icon className="test" />
    ));

    expect(tree.is('.test'))
      .toBeTruthy();
  });
});

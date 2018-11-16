import * as React from 'react';
import { shallow } from 'enzyme';
import { Content } from './content';

describe('Content', () => {
  const defaultProps = {
    text: 'text-content',
  };

  it('should render content', () => {
    const tree = shallow((
      <Content
        {...defaultProps}
      />
    ));

    expect(tree.find('span').text()).toBe('text-content');
  });
});

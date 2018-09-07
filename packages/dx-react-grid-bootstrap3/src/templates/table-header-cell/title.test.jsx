import * as React from 'react';
import { shallow } from 'enzyme';

import { Title } from './title';

const defaultProps = {
  children: <span />,
};

describe('Title', () => {
  it('should apply custom styles', () => {
    const tree = shallow((
      <Title
        {...defaultProps}
        style={{ color: 'red' }}
      />
    ));
    expect(tree.prop('style'))
      .toMatchObject({
        color: 'red',
      });
  });

  it('should spread rest props to the root element', () => {
    const tree = shallow((
      <Title
        {...defaultProps}
        data={{ a: 1 }}
      />
    ));
    expect(tree.prop('data'))
      .toMatchObject({
        a: 1,
      });
  });
});

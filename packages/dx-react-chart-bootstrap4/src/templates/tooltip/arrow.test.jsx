import * as React from 'react';
import { shallow } from 'enzyme';
import { Arrow } from './arrow';

describe('Content', () => {
  const defaultProps = {
    arrowProps: { style: 'style' },
  };

  it('should render content', () => {
    const tree = shallow((
      <Arrow
        {...defaultProps}
      />
    ));

    expect(tree.find('div').props()).toEqual({ className: 'arrow', style: 'style' });
  });
});

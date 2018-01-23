import React from 'react';
import { shallow } from 'enzyme';

import { SortingControl } from './sorting-control';

describe('TableHeaderCell with keyboard navigation', () => {
  it('can get focus', () => {
    const tree = shallow((
      <SortingControl
        align="right"
        columnTitle="Test"
        onClick={() => {}}
      />
    ));

    expect(tree.find('span').prop('tabIndex'))
      .toBe(0);
  });
});

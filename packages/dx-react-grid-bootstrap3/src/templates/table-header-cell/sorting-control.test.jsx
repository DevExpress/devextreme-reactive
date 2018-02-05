import * as React from 'react';
import { mount } from 'enzyme';

import { SortingControl } from './sorting-control';

describe('with keyboard navigation', () => {
  it('can get focus', () => {
    const tree = mount((
      <SortingControl
        align="Right"
        columnTitle="Test"
        onClick={() => {}}
      />
    ));

    expect(tree.find('span').prop('tabIndex'))
      .toBe(0);
  });
});

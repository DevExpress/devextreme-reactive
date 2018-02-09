import * as React from 'react';
import { mount } from 'enzyme';

import { SortingControl } from './sorting-control';

describe('with keyboard navigation', () => {
  it('can get focus', () => {
    const tree = mount((
      <SortingControl
        align="right"
        columnTitle="Test"
        onClick={() => {}}
      />
    ));

    expect(tree.find('span').at(0).prop('tabIndex'))
      .toBe(0);
  });
});

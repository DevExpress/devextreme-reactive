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

  it('can not get focus if disabled is true', () => {
    const tree = mount((
      <SortingControl
        align="right"
        columnTitle="Test"
        disabled
        onClick={() => {}}
      />
    ));

    expect(tree.find('span').at(0).prop('tabIndex'))
      .toBe(-1);
  });

  it('should reverse content if align is right', () => {
    const tree = mount((
      <SortingControl
        align="right"
        columnTitle="Test"
        onClick={() => {}}
      />
    ));

    expect(tree.find('span').at(0).prop('style'))
      .toMatchObject({ flexDirection: 'row-reverse' });
  });
});

import React from 'react';
import { mount } from 'enzyme';
import { EmptyMessage } from './empty-message';

describe('EmptyMessage', () => {
  it('should use "noColumns" message key', () => {
    const tree = mount((
      <EmptyMessage getMessage={key => key} />
    ));

    expect(tree.find('.panel-body').text()).toBe('noColumns');
  });
});

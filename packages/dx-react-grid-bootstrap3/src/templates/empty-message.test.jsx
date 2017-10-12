import React from 'react';
import { mount } from 'enzyme';
import { EmptyMessage } from './empty-message';

describe('EmptyMessage', () => {
  it('should use "Nothing to show" string by default', () => {
    const tree = mount(
      <EmptyMessage getMessage={() => {}} />,
    );

    expect(tree.find('.panel-body').text()).toBe('Nothing to show');
  });

  it('should use custom text if defined', () => {
    const tree = mount(
      <EmptyMessage getMessage={() => 'No columns'} />,
    );

    expect(tree.find('.panel-body').text()).toBe('No columns');
  });
});

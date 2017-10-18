import React from 'react';
import { mount } from 'enzyme';
import { EmptyMessage } from './empty-message';

describe('EmptyMessage', () => {
  it('should use "Nothing to show" text', () => {
    const text = 'Nothing to show';
    const getMessage = jest.fn();
    getMessage.mockImplementation(() => text);

    const tree = mount((
      <EmptyMessage getMessage={getMessage} />
    ));

    expect(getMessage).toBeCalledWith('noColumns');
    expect(tree.find('.panel-body').text()).toBe(text);
  });
});

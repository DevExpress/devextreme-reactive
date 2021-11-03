import * as React from 'react';
import { createMount } from '@devexpress/dx-testing';
import { EmptyMessage } from './empty-message';

describe('EmptyMessage', () => {
  let mount;
  beforeAll(() => {
    mount = createMount();
  });

  it('should use "Nothing to show" text', () => {
    const tree = mount((
      <EmptyMessage getMessage={key => key} />
    ));
    expect(tree.find('big').text()).toBe('noColumns');
  });

  it('should pass rest props to the root element', () => {
    const tree = mount((
      <EmptyMessage
        getMessage={key => key}
        className="custom-class"
      />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });
});

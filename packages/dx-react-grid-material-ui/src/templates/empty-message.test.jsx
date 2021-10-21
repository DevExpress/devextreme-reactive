import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import { EmptyMessage } from './empty-message';

describe('EmptyMessage', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });

  it('should use "Nothing to show" text', () => {
    const tree = shallow((
      <EmptyMessage getMessage={key => key} />
    ));
    expect(tree.find('big').text()).toBe('noColumns');
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <EmptyMessage
        getMessage={key => key}
        className="custom-class"
      />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });
});

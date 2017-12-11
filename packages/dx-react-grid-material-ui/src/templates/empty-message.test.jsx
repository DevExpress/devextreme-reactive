import React from 'react';
import { createShallow } from 'material-ui/test-utils';
import { Typography } from 'material-ui';
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
    expect(tree.find(Typography).dive().dive().text()).toBe('noColumns');
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

import React from 'react';
import { createMount } from 'material-ui/test-utils';
import { Typography } from 'material-ui';
import { EmptyMessage } from './empty-message';

describe('EmptyMessage', () => {
  let mount;
  beforeAll(() => {
    mount = createMount();
  });
  afterAll(() => {
    mount.cleanUp();
  });

  it('should use "Nothing to show" text', () => {
    const text = 'Nothing to show';
    const getMessage = jest.fn();
    getMessage.mockImplementation(() => text);

    const tree = mount((
      <EmptyMessage getMessage={getMessage} />
    ));

    expect(getMessage).toBeCalledWith('noColumns');
    expect(tree.find(Typography).text()).toBe(text);
  });
});

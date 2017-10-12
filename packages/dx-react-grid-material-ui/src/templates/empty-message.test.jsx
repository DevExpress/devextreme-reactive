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

  it('should use "Nothing to show" string by default', () => {
    const tree = mount(
      <EmptyMessage getMessage={() => {}} />,
    );

    expect(tree.find(Typography).text()).toBe('Nothing to show');
  });

  it('should use custom text if defined', () => {
    const tree = mount(
      <EmptyMessage getMessage={() => 'No columns'} />,
    );

    expect(tree.find(Typography).text()).toBe('No columns');
  });
});

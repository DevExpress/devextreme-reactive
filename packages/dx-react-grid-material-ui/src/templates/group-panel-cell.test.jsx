import React from 'react';
import { mountWithStyles } from '../utils/testing';
import { GroupPanelCell } from './group-panel-cell';

describe('GroupPanelCell', () => {
  test('should use column name if title is not specified', () => {
    const tree = mountWithStyles(
      <GroupPanelCell
        column={{
          name: 'Test',
        }}
      />,
    );

    expect(tree.find('TableSortLabel').text()).toBe('Test');
  });
});

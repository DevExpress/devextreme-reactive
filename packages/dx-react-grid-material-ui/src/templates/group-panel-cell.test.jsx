import React from 'react';
import { Chip } from 'material-ui';
import { mountWithStyles } from '../utils/testing';
import { GroupPanelCell } from './group-panel-cell';

describe('GroupPanelCell', () => {
  it('should use column name if title is not specified', () => {
    const tree = mountWithStyles(
      <GroupPanelCell
        column={{
          name: 'Test',
        }}
      />,
    );

    expect(tree.find('TableSortLabel').text()).toBe('Test');
  });

  it('should cancel sorting by using the Ctrl key', () => {
    const changeSortingDirection = jest.fn();
    const tree = mountWithStyles(
      <GroupPanelCell
        column={{
          name: 'Test',
        }}
        changeSortingDirection={changeSortingDirection}
        allowSorting
      />,
    );

    tree.find(Chip).simulate('click', { ctrlKey: true });

    expect(changeSortingDirection.mock.calls).toHaveLength(1);
    expect(changeSortingDirection.mock.calls[0][0].cancel).toBeTruthy();
  });
});

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

  test('should cancel sorting by using the Ctrl key', () => {
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

    tree.find('span > span > span').simulate('click', { ctrlKey: true });

    expect(changeSortingDirection.mock.calls).toHaveLength(1);
    expect(changeSortingDirection.mock.calls[0][0].cancel).toBeTruthy();
  });
});

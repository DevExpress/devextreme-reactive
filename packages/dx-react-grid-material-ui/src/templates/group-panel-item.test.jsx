import React from 'react';
import { Chip } from 'material-ui';
import { createMount } from 'material-ui/test-utils';
import { GroupPanelItem } from './group-panel-item';

describe('GroupPanelItem', () => {
  let mount;
  beforeAll(() => {
    mount = createMount();
  });
  afterAll(() => {
    mount.cleanUp();
  });

  it('should use column name if title is not specified', () => {
    const tree = mount((
      <GroupPanelItem
        column={{
          name: 'Test',
        }}
      />
    ));

    expect(tree.text()).toBe('Test');
  });

  it('should not render the "TableSortLabel" component if sorting is disabled', () => {
    const tree = mount((
      <GroupPanelItem
        column={{
          name: 'Test',
        }}
      />
    ));

    expect(tree.find('TableSortLabel').exists()).toBeFalsy();
  });

  it('should cancel sorting by using the Ctrl key', () => {
    const changeSortingDirection = jest.fn();
    const tree = mount((
      <GroupPanelItem
        column={{
          name: 'Test',
        }}
        changeSortingDirection={changeSortingDirection}
        allowSorting
      />
    ));

    tree.find(Chip).simulate('click', { ctrlKey: true });

    expect(changeSortingDirection.mock.calls).toHaveLength(1);
    expect(changeSortingDirection.mock.calls[0][0].cancel).toBeTruthy();
  });

  it('should use column name for sorting', () => {
    const changeSortingDirection = jest.fn();
    const tree = mount((
      <GroupPanelItem
        column={{
          name: 'Test',
        }}
        changeSortingDirection={changeSortingDirection}
        allowSorting
      />
    ));

    tree.find(Chip).simulate('click');

    expect(changeSortingDirection.mock.calls[0][0].columnName).toBe('Test');
  });

  it('can render the ungroup button', () => {
    const tree = mount((
      <GroupPanelItem
        column={{
          name: 'test',
        }}
        allowUngroupingByClick
      />
    ));
    expect(tree.find('Chip').props())
      .toHaveProperty('onRequestDelete');
  });
});

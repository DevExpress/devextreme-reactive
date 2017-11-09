import React from 'react';
import { Chip } from 'material-ui';
import { createMount } from 'material-ui/test-utils';
import { GroupPanelItem } from './group-panel-item';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

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
    expect(tree.find(Chip).props())
      .toHaveProperty('onRequestDelete');
  });

  it('should not change sorting if sorting is not allowed', () => {
    const changeSortingDirection = jest.fn();
    const tree = mount((
      <GroupPanelItem
        changeSortingDirection={changeSortingDirection}
        column={{
          name: 'test',
        }}
      />
    ));
    const сhipElem = tree.find(Chip);

    сhipElem.simulate('keydown', { keyCode: ENTER_KEY_CODE });
    expect(changeSortingDirection)
      .not.toHaveBeenCalled();
  });

  it('should handle the "Enter" and "Space" keys down and "Mouse click" for sorting change', () => {
    const changeSortingDirection = jest.fn();
    const tree = mount((
      <GroupPanelItem
        changeSortingDirection={changeSortingDirection}
        column={{
          name: 'test',
        }}
        allowSorting
      />
    ));
    const сhipElem = tree.find(Chip);

    сhipElem.simulate('keydown', { keyCode: ENTER_KEY_CODE });
    expect(changeSortingDirection)
      .toHaveBeenCalled();

    changeSortingDirection.mockClear();
    сhipElem.simulate('keydown', { keyCode: SPACE_KEY_CODE });
    expect(changeSortingDirection)
      .toHaveBeenCalled();

    changeSortingDirection.mockClear();
    сhipElem.simulate('click');
    expect(changeSortingDirection)
      .toHaveBeenCalled();

    changeSortingDirection.mockClear();
    сhipElem.simulate('keydown', { keyCode: 51 });
    expect(changeSortingDirection)
      .not.toHaveBeenCalled();
  });

  it('should cancel sorting on sorting direction change when the "Ctrl" key is pressed', () => {
    const changeSortingDirection = jest.fn();
    const tree = mount((
      <GroupPanelItem
        changeSortingDirection={changeSortingDirection}
        column={{
          name: 'test',
        }}
        allowSorting
      />
    ));

    tree.find(Chip).simulate('keydown', { keyCode: ENTER_KEY_CODE, ctrlKey: true });
    expect(changeSortingDirection)
      .toHaveBeenCalledWith({ keepOther: true, cancel: true, columnName: 'test' });
  });
});

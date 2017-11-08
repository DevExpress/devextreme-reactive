import React from 'react';
import { mount } from 'enzyme';
import { GroupPanelItem } from './group-panel-item';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

describe('GroupPanelItem', () => {
  it('should use column name if title is not specified', () => {
    const tree = mount((
      <GroupPanelItem
        column={{
          name: 'Test',
        }}
      />
    ));

    expect(tree.find('div').text()).toBe('Test');
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

    expect(tree.find('i.glyphicon-remove').exists())
      .toBeTruthy();
  });

  it('can not get focus if sorting is not allow', () => {
    const tree = mount((
      <GroupPanelItem
        column={{
          name: 'test',
        }}
      />
    ));

    const targetElement = tree.find('span').first();
    expect(targetElement.prop('tabIndex'))
      .toBe(undefined);
  });

  it('should handle the "Enter" and "Space" keys down and "Mouse click" for sorting change', () => {
    const changeSortingDirection = jest.fn();
    const tree = mount((
      <GroupPanelItem
        changeSortingDirection={changeSortingDirection}
        allowSorting
        column={{
          name: 'test',
        }}
      />
    ));

    const targetElement = tree.find('span').first();
    targetElement.simulate('keydown', { keyCode: ENTER_KEY_CODE });
    expect(changeSortingDirection)
      .toHaveBeenCalled();

    changeSortingDirection.mockClear();
    targetElement.simulate('keydown', { keyCode: SPACE_KEY_CODE });
    expect(changeSortingDirection)
      .toHaveBeenCalled();

    changeSortingDirection.mockClear();
    targetElement.simulate('click');
    expect(changeSortingDirection)
      .toHaveBeenCalled();

    changeSortingDirection.mockClear();
    targetElement.simulate('keydown', { keyCode: 51 });
    expect(changeSortingDirection)
      .not.toHaveBeenCalled();
  });

  it('should handle the "Mouse click" for ungrouping', () => {
    const groupByColumn = jest.fn();
    const tree = mount((
      <GroupPanelItem
        groupByColumn={groupByColumn}
        allowUngroupingByClick
        column={{
          name: 'test',
        }}
      />
    ));

    const targetElement = tree.find('span').last();
    targetElement.simulate('click');
    expect(groupByColumn)
      .toHaveBeenCalled();
  });

  it('should handle the "Shift" key with sorting', () => {
    const changeSortingDirection = jest.fn();
    const tree = mount((
      <GroupPanelItem
        changeSortingDirection={changeSortingDirection}
        column={{ name: 'test' }}
        allowSorting
      />
    ));

    const targetElement = tree.find('span').first();
    targetElement.simulate('keydown', { keyCode: ENTER_KEY_CODE, shiftKey: true });
    expect(changeSortingDirection)
      .toHaveBeenCalledWith({ keepOther: true, cancel: false, columnName: 'test' });
  });

  it('should handle the "Ctrl" key with sorting', () => {
    const changeSortingDirection = jest.fn();
    const tree = mount((
      <GroupPanelItem
        changeSortingDirection={changeSortingDirection}
        column={{ name: 'test' }}
        allowSorting
      />
    ));

    const targetElement = tree.find('span').first();
    targetElement.simulate('keydown', { keyCode: ENTER_KEY_CODE, ctrlKey: true });
    expect(changeSortingDirection)
      .toHaveBeenCalledWith({ keepOther: true, cancel: true, columnName: 'test' });
  });

  it('should switch sorting direction when "Enter" key down', () => {
    const changeSortingDirection = jest.fn();
    const tree = mount((
      <GroupPanelItem
        changeSortingDirection={changeSortingDirection}
        column={{ name: 'test' }}
        allowSorting
        sortingDirection="desc"
      />
    ));

    const targetElement = tree.find('span').first();
    targetElement.simulate('keydown', { keyCode: ENTER_KEY_CODE, ctrlKey: false });
    expect(changeSortingDirection)
      .toHaveBeenCalledWith({ keepOther: false, cancel: true, columnName: 'test' });
  });
});

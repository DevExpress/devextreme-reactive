import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { GroupPanelItem } from './group-panel-item';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

describe('GroupPanelItem', () => {
  it('should use column name if title is not specified', () => {
    const tree = shallow((
      <GroupPanelItem
        item={{ column: { name: 'test' } }}
      />
    ));

    expect(tree.find('div').text())
      .toBe('test');
  });

  it('can render the ungroup button', () => {
    const tree = shallow((
      <GroupPanelItem
        item={{ column: { name: 'test' } }}
        showGroupingControls
      />
    ));

    expect(tree.find('i.glyphicon-remove').exists())
      .toBeTruthy();
  });

  it('does not get focus if sorting is not allowed', () => {
    const tree = shallow((
      <GroupPanelItem
        item={{ column: { name: 'test' } }}
      />
    ));

    const targetElement = tree.find('span').first();
    expect(targetElement.prop('tabIndex'))
      .toBe(undefined);
  });

  it('should handle the "Enter" and "Space" keys down and "Mouse click" for sorting change', () => {
    const onSort = jest.fn();
    const tree = mount((
      <GroupPanelItem
        onSort={onSort}
        sortingEnabled
        showSortingControls
        item={{ column: { name: 'test' } }}
      />
    ));

    const targetElement = tree.find('span').first();
    targetElement.simulate('keydown', { keyCode: ENTER_KEY_CODE });
    expect(onSort)
      .toHaveBeenCalled();

    onSort.mockClear();
    targetElement.simulate('keydown', { keyCode: SPACE_KEY_CODE });
    expect(onSort)
      .toHaveBeenCalled();

    onSort.mockClear();
    targetElement.simulate('click');
    expect(onSort)
      .toHaveBeenCalled();

    onSort.mockClear();
    targetElement.simulate('keydown', { keyCode: 51 });
    expect(onSort)
      .not.toHaveBeenCalled();
  });

  it('should handle the "Mouse click" for ungrouping', () => {
    const onGroup = jest.fn();
    const tree = mount((
      <GroupPanelItem
        onGroup={onGroup}
        showGroupingControls
        groupingEnabled
        item={{ column: { name: 'test' } }}
      />
    ));

    const targetElement = tree.find('span').last();
    targetElement.simulate('click');
    expect(onGroup)
      .toHaveBeenCalled();
  });

  it('should cancel sorting on sorting direction change when the "Ctrl" key is pressed', () => {
    const onSort = jest.fn();
    const tree = mount((
      <GroupPanelItem
        onSort={onSort}
        item={{ column: { name: 'test' } }}
        sortingEnabled
        showSortingControls
      />
    ));

    const targetElement = tree.find('span').first();
    targetElement.simulate('keydown', { keyCode: ENTER_KEY_CODE, ctrlKey: true });
    expect(onSort)
      .toHaveBeenCalledWith({ keepOther: true, direction: null });
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <GroupPanelItem
        item={{ column: { name: 'test' } }}
        data={{ a: 1 }}
      />
    ));

    expect(tree.prop('data'))
      .toEqual({ a: 1 });
  });

  it('should add the passed className to the root element', () => {
    const tree = shallow((
      <GroupPanelItem
        item={{ column: { name: 'test' } }}
        className="custom-class"
      />
    ));

    expect(tree.hasClass('custom-class'))
      .toBeTruthy();
    expect(tree.hasClass('btn-group'))
      .toBeTruthy();
  });

  it('should apply the disabled class if grouping and sorting are not allowed', () => {
    const tree = shallow((
      <GroupPanelItem
        item={{ column: { name: 'test' } }}
        showGroupingControls
        showSortingControls
      />
    ));
    const buttons = tree.find('.btn-default.disabled');
    expect(buttons).toHaveLength(2);
  });

  it('should not apply the disabled class if grouping and sorting are allowed', () => {
    const tree = shallow((
      <GroupPanelItem
        item={{ column: { name: 'test' } }}
        groupingEnabled
        sortingEnabled
        showGroupingControls
        showSortingControls
      />
    ));
    const buttons = tree.find('.btn-default.disabled');
    expect(buttons).toHaveLength(0);
  });

  it('should apply custom styles', () => {
    const tree = shallow((
      <GroupPanelItem
        item={{ column: { name: 'test' } }}
        style={{ color: 'red' }}
      />
    ));

    expect(tree.find('div').prop('style'))
      .toMatchObject({
        color: 'red',
      });
  });
});

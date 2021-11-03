import * as React from 'react';
import Chip from '@mui/material/Chip';
import TableSortLabel from '@mui/material/TableSortLabel';
import { createMount, createShallow } from '@devexpress/dx-testing';
import { GroupPanelItem, classes } from './group-panel-item';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

describe('GroupPanelItem', () => {
  let mount;
  let shallow;
  beforeAll(() => {
    shallow = createShallow();
  });
  beforeEach(() => {
    mount = createMount();
  });
  afterEach(() => {
    mount.cleanUp();
  });

  it('should use column name if title is not specified', () => {
    const tree = shallow((
      <GroupPanelItem
        item={{ column: { name: 'test' } }}
      />
    ));

    expect(tree.dive().dive().text())
      .toBe('test');
  });

  it('should not render the "TableSortLabel" component if sorting is disabled', () => {
    const tree = shallow((
      <GroupPanelItem
        item={{ column: { name: 'test' } }}
      />
    ));

    expect(tree.find('TableSortLabel').exists()).toBeFalsy();
  });

  it('should cancel sorting by using the Ctrl key', () => {
    const onSort = jest.fn();
    const tree = mount((
      <GroupPanelItem
        item={{ column: { name: 'test' } }}
        onSort={onSort}
        showSortingControls
        sortingEnabled
      />
    ));

    tree.find(Chip).simulate('click', { ctrlKey: true });

    expect(onSort.mock.calls).toHaveLength(1);
    expect(onSort.mock.calls[0][0].direction).toBe(null);
  });

  it('can render the ungroup button', () => {
    const tree = mount((
      <GroupPanelItem
        item={{ column: { name: 'test' } }}
        showGroupingControls
      />
    ));
    expect(tree.find(Chip).props())
      .toHaveProperty('onDelete');
  });

  it('should not render the ungroup button if grouping is disabled', () => {
    const tree = mount((
      <GroupPanelItem
        item={{ column: { name: 'test' } }}
        groupingEnabled={false}
        showGroupingControls
      />
    ));
    expect(tree.find(Chip).prop('onDelete'))
      .toBeNull();
  });

  it('should not change sorting if sorting is not allowed', () => {
    const onSort = jest.fn();
    const tree = mount((
      <GroupPanelItem
        onSort={onSort}
        item={{ column: { name: 'test' } }}
        showSortingControls
      />
    ));
    const сhipElem = tree.find(Chip);

    сhipElem.simulate('keydown', { keyCode: ENTER_KEY_CODE });
    expect(onSort)
      .not.toHaveBeenCalled();
    expect(tree.find(Chip).prop('onClick'))
      .toBeNull();
  });

  it('should handle the "Enter" and "Space" keys down and "Mouse click" for sorting change', () => {
    const onSort = jest.fn();
    const tree = mount((
      <GroupPanelItem
        onSort={onSort}
        item={{ column: { name: 'test' } }}
        showSortingControls
        sortingEnabled
      />
    ));
    const сhipElem = tree.find(Chip);

    сhipElem.simulate('keydown', { keyCode: ENTER_KEY_CODE, key: 'Enter' });
    expect(onSort)
      .toHaveBeenCalled();

    onSort.mockClear();
    сhipElem.simulate('keyup', { keyCode: SPACE_KEY_CODE, key: ' ' });
    expect(onSort)
      .toHaveBeenCalled();

    onSort.mockClear();
    сhipElem.simulate('click');
    expect(onSort)
      .toHaveBeenCalled();

    onSort.mockClear();
    сhipElem.simulate('keyup', { keyCode: 51 });
    expect(onSort)
      .not.toHaveBeenCalled();
  });

  it('should cancel sorting on sorting direction change when the "Ctrl" key is pressed', () => {
    const onSort = jest.fn();
    const tree = mount((
      <GroupPanelItem
        onSort={onSort}
        item={{ column: { name: 'test' } }}
        showSortingControls
        sortingEnabled
      />
    ));

    tree.find(Chip).simulate('keydown', { keyCode: ENTER_KEY_CODE, ctrlKey: true, key: 'Enter' });
    expect(onSort)
      .toHaveBeenCalledWith({ keepOther: true, direction: null });
  });

  it('should process nullable sortingDirection', () => {
    const tree = mount((
      <GroupPanelItem
        item={{ column: { name: 'test' } }}
        sortingDirection={null}
        showSortingControls
        sortingEnabled
      />
    ));

    expect(tree.find(TableSortLabel).props().direction).toBeUndefined();
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
    expect(tree.hasClass(classes.button))
      .toBeTruthy();
  });

  describe('sorting label', () => {
    it('should add class "buttonWithoutIcon" if not show sorting control', () => {
      const tree = shallow((
        <GroupPanelItem
          item={{ column: { name: 'test' } }}
        />
      ));

      expect(tree.hasClass(classes.withoutIcon))
        .toBe(true);

      tree.simulate('mouseenter');
      expect(tree.hasClass(classes.withoutIcon))
        .toBe(true);

      tree.simulate('mouseleave');
      expect(tree.hasClass(classes.withoutIcon))
        .toBe(true);
    });

    it('should add class "buttonWithoutIcon" if show sorting control but not sorted or hovered', () => {
      const tree = shallow((
        <GroupPanelItem
          item={{ column: { name: 'test' } }}
          sortingDirection={null}
          showSortingControls
        />
      ));

      expect(tree.hasClass(classes.withoutIcon))
        .toBe(true);
    });

    it('should remove class "buttonWithoutIcon" if sorted', () => {
      const tree = shallow((
        <GroupPanelItem
          item={{ column: { name: 'test' } }}
          sortingDirection={null}
          showSortingControls
        />
      ));

      expect(tree.hasClass(classes.withoutIcon))
        .toBe(true);

      tree.setProps({ sortingDirection: 'asc' });
      expect(tree.hasClass(classes.withoutIcon))
        .toBe(false);
    });

    it('should remove class "buttonWithoutIcon" on hover', () => {
      const tree = shallow((
        <GroupPanelItem
          item={{ column: { name: 'test' } }}
          sortingDirection={null}
          showSortingControls
        />
      ));

      expect(tree.hasClass(classes.withoutIcon))
        .toBe(true);

      tree.simulate('mouseenter');
      expect(tree.hasClass(classes.withoutIcon))
        .toBe(false);

      tree.simulate('mouseleave');
      expect(tree.hasClass(classes.withoutIcon))
        .toBe(true);
    });
  });
});

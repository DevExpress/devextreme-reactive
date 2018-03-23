import * as React from 'react';
import { createShallow, createMount } from 'material-ui/test-utils';
import { TableSortLabel } from 'material-ui/Table';
import Tooltip from 'material-ui/Tooltip';
import { SortingControl } from './sorting-control';

const defaultProps = {
  title: 'a',
  classes: {},
  sort: () => {},
  getMessage: key => key,
};

const e = {
  preventDefault: () => {},
};

describe('SortingControl', () => {
  let shallow;
  let mount;
  beforeAll(() => {
    shallow = createShallow({ untilSelector: 'SortingControlBase' });
    mount = createMount();
  });
  afterAll(() => {
    shallow.cleanUp();
  });

  it('should render tooltip', () => {
    const tree = shallow((
      <SortingControl
        {...defaultProps}
      />
    ));
    const tooltip = tree.find(Tooltip);
    expect(tooltip.exists())
      .toBeTruthy();
    expect(tooltip.props().title)
      .toBe('sortingHint');
  });

  it('should spread rest props to the root element', () => {
    const tree = shallow((
      <SortingControl
        {...defaultProps}
        data={{ a: 1 }}
      />
    ));
    expect(tree.props().data)
      .toEqual({ a: 1 });
  });

  it('should process nullable sortingDirection', () => {
    const tree = shallow((
      <SortingControl
        {...defaultProps}
        sortingDirection={null}
      />
    ));

    expect(tree.find(TableSortLabel).props().direction).toBeUndefined();
  });

  describe('with keyboard navigation', () => {
    const ENTER_KEY_CODE = 13;
    const SPACE_KEY_CODE = 32;

    it('should handle the "Enter" and "Space" keys down', () => {
      const sort = jest.fn();
      const tree = mount((
        <SortingControl
          {...defaultProps}
          sort={sort}
        />
      ));
      const SortLabel = tree.find(TableSortLabel);

      SortLabel.simulate('keydown', { ...e, keyCode: ENTER_KEY_CODE });
      expect(sort)
        .toHaveBeenCalled();

      sort.mockClear();
      SortLabel.simulate('keydown', { ...e, keyCode: SPACE_KEY_CODE });
      expect(sort)
        .toHaveBeenCalled();

      sort.mockClear();
      SortLabel.simulate('keydown', { ...e, keyCode: 51 });
      expect(sort)
        .not.toHaveBeenCalled();
    });

    it('should keep other sorting parameters on sorting change when the "Shift" key is pressed', () => {
      const sort = jest.fn();
      const tree = mount((
        <SortingControl
          {...defaultProps}
          sort={sort}
        />
      ));

      tree.find(TableSortLabel).simulate('keydown', { ...e, keyCode: ENTER_KEY_CODE, shiftKey: true });
      expect(sort)
        .toHaveBeenCalledWith({ keepOther: true, cancel: undefined });
    });

    it('should handle the "Ctrl" key with sorting', () => {
      const sort = jest.fn();
      const tree = mount((
        <SortingControl
          {...defaultProps}
          sort={sort}
        />
      ));

      tree.find(TableSortLabel).simulate('keydown', { ...e, keyCode: ENTER_KEY_CODE, ctrlKey: true });
      expect(sort)
        .toHaveBeenCalledWith({ keepOther: true, direction: null });
    });

    it('should cancel sorting by using the Ctrl key', () => {
      const sort = jest.fn();
      const tree = shallow((
        <SortingControl
          {...defaultProps}
          sort={sort}
        />
      ));

      tree.find(TableSortLabel).simulate('click', { ...e, ctrlKey: true });

      expect(sort.mock.calls).toHaveLength(1);
      expect(sort.mock.calls[0][0].direction).toBe(null);
    });
  });
});

import * as React from 'react';
import { createShallow, createMount } from '@devexpress/dx-testing';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { SortLabel, classes } from './sort-label';

const defaultProps = {
  title: 'a',
  classes: {},
  onSort: () => {},
  getMessage: key => key,
};

const e = {
  preventDefault: () => {},
};

describe('SortLabel', () => {
  let shallow;
  let mount;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });
  beforeEach(() => {
    mount = createMount();
  });
  afterEach(() => {
    mount.cleanUp();
  });

  it('should render tooltip', () => {
    const tree = mount((
      <SortLabel
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
      <SortLabel
        {...defaultProps}
        data={{ a: 1 }}
      />
    ));
    expect(tree.props().data)
      .toEqual({ a: 1 });
  });

  it('should apply custom class to the root element', () => {
    const tree = shallow((
      <SortLabel
        {...defaultProps}
        className="customClass"
      />
    ));
    expect(tree.is(`.${classes.root}`))
      .toBeTruthy();
    expect(tree.is('.customClass'))
      .toBeTruthy();
  });

  it('should process nullable direction', () => {
    const tree = mount((
      <SortLabel
        {...defaultProps}
        direction={null}
      />
    ));

    expect(tree.find(TableSortLabel).props().direction).toBeUndefined();
  });

  describe('with keyboard navigation', () => {
    const ENTER_KEY_CODE = 13;
    const SPACE_KEY_CODE = 32;

    it('should handle the "Enter" and "Space" keys down', () => {
      const onSort = jest.fn();
      const tree = mount((
        <SortLabel
          {...defaultProps}
          onSort={onSort}
        />
      ));
      const sortLabel = tree.find(TableSortLabel);

      sortLabel.simulate('keydown', { ...e, keyCode: ENTER_KEY_CODE, key: 'Enter' });
      expect(onSort)
        .toHaveBeenCalled();

      onSort.mockClear();
      sortLabel.simulate('keydown', { ...e, keyCode: SPACE_KEY_CODE, key: 'Enter' });
      expect(onSort)
        .toHaveBeenCalled();

      onSort.mockClear();
      sortLabel.simulate('keydown', { ...e, keyCode: 51 });
      expect(onSort)
        .not.toHaveBeenCalled();
    });

    it('should keep other sorting parameters on sorting change when the "Shift" key is pressed', () => {
      const onSort = jest.fn();
      const tree = mount((
        <SortLabel
          {...defaultProps}
          onSort={onSort}
        />
      ));

      tree.find(TableSortLabel).simulate('keydown', {
        ...e,
        keyCode: ENTER_KEY_CODE,
        shiftKey: true,
        key: 'Enter',
      });
      expect(onSort)
        .toHaveBeenCalledWith({ keepOther: true, cancel: undefined });
    });

    it('should handle the "Ctrl" key with sorting', () => {
      const onSort = jest.fn();
      const tree = mount((
        <SortLabel
          {...defaultProps}
          onSort={onSort}
        />
      ));

      tree.find(TableSortLabel).simulate('keydown', {
        ...e,
        keyCode: ENTER_KEY_CODE,
        ctrlKey: true,
        key: 'Enter',
      });
      expect(onSort)
        .toHaveBeenCalledWith({ keepOther: true, direction: null });
    });

    it('should cancel sorting by using the Ctrl key', () => {
      const onSort = jest.fn();
      const tree = mount((
        <SortLabel
          {...defaultProps}
          onSort={onSort}
        />
      ));

      tree.find(TableSortLabel).simulate('click', { ...e, ctrlKey: true });

      expect(onSort.mock.calls).toHaveLength(1);
      expect(onSort.mock.calls[0][0].direction).toBe(null);
    });

    it('should add correct class if align is right', () => {
      const tree = mount((
        <SortLabel
          {...defaultProps}
          align="right"
        />
      ));

      expect(tree.find(TableSortLabel).prop('classes').root)
        .toContain(classes.sortLabelRight);
    });
  });
});

import { shallow } from '@vue/test-utils';
import { GroupPanelItem } from './group-panel-item';

describe('GroupPanelItem', () => {
  const ENTER_KEY_CODE = 13;
  const SPACE_KEY_CODE = 32;
  it('should use column name if title is not specified', () => {
    const tree = shallow({
      render() {
        return (
          <GroupPanelItem
            item={{ column: { name: 'test' } }}
          />
        );
      },
    });

    expect(tree.find('div').text())
      .toBe('test');
  });

  it('can render the ungroup button', () => {
    const tree = shallow({
      render() {
        return (
          <GroupPanelItem
            item={{ column: { name: 'test' } }}
            showGroupingControls
          />
        );
      },
    });

    expect(tree.find('span.oi-x').exists())
      .toBeTruthy();
  });

  it('does not get focus if sorting is not allowed', () => {
    const tree = shallow({
      render() {
        return (
          <GroupPanelItem
            item={{ column: { name: 'test' } }}
          />
        );
      },
    });

    const targetElement = tree.findAll('span').at(0);
    expect(targetElement.attributes().tabIndex)
      .toBe(undefined);
  });

  it('should handle the "Enter" and "Space" keys down and "Mouse click" for sorting change', () => {
    const onSort = jest.fn();
    const tree = shallow({
      render() {
        return (
          <GroupPanelItem
            onSort={onSort}
            showSortingControls
            sortingEnabled
            item={{ column: { name: 'test' } }}
          />
        );
      },
    });

    const targetElement = tree.findAll('span').at(0);
    targetElement.trigger('keydown', { preventDefault: jest.fn(), keyCode: ENTER_KEY_CODE });
    expect(onSort)
      .toHaveBeenCalled();

    onSort.mockClear();
    targetElement.trigger('keydown', { preventDefault: jest.fn(), keyCode: SPACE_KEY_CODE });
    expect(onSort)
      .toHaveBeenCalled();

    onSort.mockClear();
    targetElement.trigger('click', { preventDefault: jest.fn() });
    expect(onSort)
      .toHaveBeenCalled();

    onSort.mockClear();
    targetElement.trigger('keydown', { keyCode: 51 });
    expect(onSort)
      .not.toHaveBeenCalled();
  });

  it('should handle the "Mouse click" for ungrouping', () => {
    const onGroup = jest.fn();
    const tree = shallow({
      render() {
        return (
          <GroupPanelItem
            onGroup={onGroup}
            showGroupingControls
            groupingEnabled
            item={{ column: { name: 'test' } }}
          />
        );
      },
    });

    const targetElement = tree.findAll('span').at(1);
    targetElement.trigger('click');
    expect(onGroup)
      .toHaveBeenCalled();
  });

  it('should cancel sorting on sorting direction change when the "Ctrl" key is pressed', () => {
    const onSort = jest.fn();
    const tree = shallow({
      render() {
        return (
          <GroupPanelItem
            onSort={onSort}
            item={{ column: { name: 'test' } }}
            sortingEnabled
            showSortingControls
          />
        );
      },
    });

    const targetElement = tree.findAll('span').at(0);
    targetElement.trigger('keydown', { preventDefault: jest.fn(), keyCode: ENTER_KEY_CODE, ctrlKey: true });
    expect(onSort)
      .toHaveBeenCalledWith({ keepOther: true, direction: null });
  });

  it('should apply the disabled class if grouping and sorting are not allowed', () => {
    const tree = shallow({
      render() {
        return (
          <GroupPanelItem
            item={{ column: { name: 'test' } }}
            showGroupingControls
            showSortingControls
          />
        );
      },
    });

    const buttons = tree.findAll('.disabled');
    expect(buttons).toHaveLength(2);
  });

  it('should not apply the disabled class if grouping and sorting are allowed', () => {
    const tree = shallow({
      render() {
        return (
          <GroupPanelItem
            item={{ column: { name: 'test' } }}
            groupingEnabled
            sortingEnabled
            showGroupingControls
            showSortingControls
          />
        );
      },
    });

    const buttons = tree.findAll('.disabled');
    expect(buttons).toHaveLength(0);
  });
});

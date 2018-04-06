import { mount } from '@vue/test-utils';
import { PluginHost } from '@devexpress/dx-vue-core';
import {
  changeColumnSorting,
  getColumnExtensionValueGetter,
  getPersistentSortedColumns,
  calculateKeepOther,
} from '@devexpress/dx-grid-core';
import { SortingState } from './sorting-state';
import { PluginDepsToComponents, executeComputedAction, getComputedState } from './test-utils';

const defaultDeps = {
  getter: {
    sorting: [],
  },
  action: {
    changeColumnSorting: jest.fn(),
  },
};

jest.mock('@devexpress/dx-grid-core', () => ({
  changeColumnSorting: jest.fn(),
  getColumnExtensionValueGetter: jest.fn(),
  getPersistentSortedColumns: jest.fn(),
  calculateKeepOther: jest.fn(),
}));

describe('SortingState', () => {
  beforeEach(() => {
    getColumnExtensionValueGetter.mockImplementation(() => () => {});
    getPersistentSortedColumns.mockImplementation(() => []);
    calculateKeepOther.mockImplementation((sorting, keepOther) => keepOther);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should provide sorting getter', () => {
    const tree = mount({
      render() {
        return (
          <PluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <SortingState sorting={['a']} />
          </PluginHost>
        );
      },
    });
    expect(getComputedState(tree).sorting)
      .toEqual(['a']);
  });

  it('should call changeColumnSorting', () => {
    const tree = mount({
      render() {
        return (
          <PluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <SortingState sorting={['a']} />
          </PluginHost>
        );
      },
    });
    executeComputedAction(tree, (actions) => {
      actions.changeColumnSorting({ keepOther: ['a'] });
    });

    expect(changeColumnSorting.mock.calls[0][0])
      .toMatchObject({ sorting: ['a'] });
    expect(changeColumnSorting.mock.calls[0][1])
      .toEqual({ keepOther: ['a'] });
  });
});

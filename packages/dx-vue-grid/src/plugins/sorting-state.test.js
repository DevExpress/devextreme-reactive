import { mount } from '@vue/test-utils';
import { DxPluginHost } from '@devexpress/dx-vue-core';
import {
  changeColumnSorting,
  getColumnExtensionValueGetter,
  getPersistentSortedColumns,
  calculateKeepOther,
} from '@devexpress/dx-grid-core';
import { DxSortingState } from './sorting-state';
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

describe('DxSortingState', () => {
  beforeEach(() => {
    changeColumnSorting.mockImplementation(() => ({}));
    getColumnExtensionValueGetter.mockImplementation(() => () => {});
    getPersistentSortedColumns.mockImplementation(() => []);
    calculateKeepOther.mockImplementation((sorting, keepOther) => keepOther);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should provide sorting getter', () => {
    const sorting = ['a'];
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxSortingState sorting={sorting} />
          </DxPluginHost>
        );
      },
    });
    expect(getComputedState(tree).sorting)
      .toBe(sorting);
  });

  it('should call changeColumnSorting', () => {
    const changeColumnSortingValue = { sorting: 'new sorting' };
    changeColumnSorting.mockImplementation(() => changeColumnSortingValue);
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxSortingState sorting={['a']} />
          </DxPluginHost>
        );
      },
    });

    executeComputedAction(tree, (actions) => {
      actions.changeColumnSorting({ keepOther: ['a'] });
    });

    expect(tree.find(DxSortingState).emitted()['update:sorting'][0][0])
      .toBe(changeColumnSortingValue.sorting);
    expect(changeColumnSorting.mock.calls[0][0])
      .toEqual({ sorting: ['a'] });
    expect(changeColumnSorting.mock.calls[0][1])
      .toEqual({ keepOther: ['a'] });
  });
});

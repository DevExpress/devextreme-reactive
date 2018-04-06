import { mount } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-vue-core';
import { changeColumnFilter, getColumnExtensionValueGetter } from '@devexpress/dx-grid-core';
import { PluginDepsToComponents, getComputedState, executeComputedAction } from './test-utils';
import { FilteringState } from './filtering-state';

jest.mock('@devexpress/dx-grid-core', () => ({
  changeColumnFilter: jest.fn(),
  getColumnExtensionValueGetter: jest.fn(),
  pushFilterExpression: jest.fn().mockImplementation(() => jest.fn().mockReturnValue('filters')),
}));

const defaultDeps = {
  getter: {
    rows: [{ id: 1 }],
  },
};

describe('FilteringState', () => {
  let resetConsole;

  beforeAll(() => {
    resetConsole = setupConsole();
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    changeColumnFilter.mockImplementation(() => []);
    getColumnExtensionValueGetter.mockImplementation(() => () => {});
  });

  describe('column extensions', () => {
    it('should correctly call getColumnExtensionValueGetter', () => {
      const columnExtensions = [{ columnName: 'a', filteringEnabled: true }];
      mount({
        render() {
          return (
            <PluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <FilteringState
                columnFilteringEnabled={false}
                columnExtensions={columnExtensions}
              />
            </PluginHost>
          );
        },
      });

      expect(getColumnExtensionValueGetter)
        .toBeCalledWith(columnExtensions, 'filteringEnabled', false);
    });
  });

  describe('getters', () => {
    const defaultFilters = [{ columnName: 'a', value: 'a' }];
    it('should provide filter expression', () => {
      const tree = mount({
        render() {
          return (
            <PluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <FilteringState
                filters={defaultFilters}
              />
            </PluginHost>
          );
        },
      });

      expect(getComputedState(tree).filterExpression)
        .toEqual('filters');
    });

    it('should provide filters getter', () => {
      const tree = mount({
        render() {
          return (
            <PluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <FilteringState filters={defaultFilters} />
            </PluginHost>
          );
        },
      });
      expect(getComputedState(tree).filters)
        .toBe(defaultFilters);
    });

    it('should call changeColumnSorting', () => {
      const changeColumnFilterPayload = { columnName: 'a', value: 'abc' };
      const changeColumnFilterValue = 'new filters';
      changeColumnFilter.mockImplementation(() => changeColumnFilterValue);
      const tree = mount({
        render() {
          return (
            <PluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <FilteringState filters={defaultFilters} />
            </PluginHost>
          );
        },
      });

      executeComputedAction(tree, (actions) => {
        actions.changeColumnFilter(changeColumnFilterPayload);
      });
      expect(tree.find(FilteringState).emitted()['update:filters'][0][0]).toBe(changeColumnFilterValue);

      expect(changeColumnFilter.mock.calls[0][0])
        .toEqual(defaultFilters);
      expect(changeColumnFilter.mock.calls[0][1])
        .toEqual(changeColumnFilterPayload);
    });
  });
});

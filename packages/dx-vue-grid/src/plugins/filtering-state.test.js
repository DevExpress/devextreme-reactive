import { mount } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { DxPluginHost } from '@devexpress/dx-vue-core';
import { changeColumnFilter, getColumnExtensionValueGetter } from '@devexpress/dx-grid-core';
import { PluginDepsToComponents, getComputedState, executeComputedAction } from './test-utils';
import { DxFilteringState } from './filtering-state';

jest.mock('@devexpress/dx-grid-core', () => ({
  changeColumnFilter: jest.fn(),
  getColumnExtensionValueGetter: jest.fn(),
  filterExpression: jest.fn().mockReturnValue('filters'),
}));

const defaultDeps = {
  getter: {
    rows: [{ id: 1 }],
  },
};

describe('DxFilteringState', () => {
  const defaultProps = {
    filters: [],
  };

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
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxFilteringState
                {...{ attrs: { ...defaultProps } }}
                columnFilteringEnabled={false}
                columnExtensions={columnExtensions}
              />
            </DxPluginHost>
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
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxFilteringState
                {...{ attrs: { ...defaultProps } }}
                filters={defaultFilters}
              />
            </DxPluginHost>
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
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxFilteringState
                {...{ attrs: { ...defaultProps } }}
                filters={defaultFilters}
              />
            </DxPluginHost>
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
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxFilteringState
                {...{ attrs: { ...defaultProps } }}
                filters={defaultFilters}
              />
            </DxPluginHost>
          );
        },
      });

      executeComputedAction(tree, (actions) => {
        actions.changeColumnFilter(changeColumnFilterPayload);
      });
      expect(tree.find(DxFilteringState).emitted()['update:filters'][0][0]).toBe(changeColumnFilterValue);

      expect(changeColumnFilter.mock.calls[0][0])
        .toEqual(defaultFilters);
      expect(changeColumnFilter.mock.calls[0][1])
        .toEqual(changeColumnFilterPayload);
    });
  });
});

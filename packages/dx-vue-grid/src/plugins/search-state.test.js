import { mount } from '@vue/test-utils';
import { PluginHost } from '@devexpress/dx-vue-core';
import { changeSearchValue, pushSearchFilterExpression } from '@devexpress/dx-grid-core';
import { PluginDepsToComponents, getComputedState, executeComputedAction } from './test-utils';
import { SearchState } from './search-state';

jest.mock('@devexpress/dx-grid-core', () => ({
  changeSearchValue: jest.fn(),
  pushSearchFilterExpression: jest.fn().mockImplementation(() => jest.fn().mockReturnValue('filters')),
}));

describe('Search state', () => {
  let resetConsole;
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    changeSearchValue.mockImplementation(() => []);
  });

  it('should provide currentPage getter', () => {
    const searchValue = 'test';
    const tree = mount({
      render() {
        return (
          <PluginHost>
            <PluginDepsToComponents deps={{}} />
            <SearchState
              value={searchValue}
            />
          </PluginHost>
        );
      },
    });

    expect(getComputedState(tree).searchValue)
      .toBe(searchValue);
  });

  it('should provide filterExpression getter', () => {
    const searchValue = 'test';
    const tree = mount({
      render() {
        return (
          <PluginHost>
            <PluginDepsToComponents deps={{}} />
            <SearchState
              value={searchValue}
            />
          </PluginHost>
        );
      },
    });

    expect(pushSearchFilterExpression).toBeCalled();
    expect(getComputedState(tree).filterExpression)
      .toBe('filters');
  });

  it('should call setCurrentPage action', () => {
    const nextSearchValue = 'new value';
    const defaultSearchValue = 'value';
    changeSearchValue.mockImplementation(() => nextSearchValue);
    const tree = mount({
      render() {
        return (
          <PluginHost>
            <PluginDepsToComponents deps={{}} />
            <SearchState
              value={defaultSearchValue}
            />
          </PluginHost>
        );
      },
    });

    executeComputedAction(tree, (actions) => {
      actions.changeSearchValue(nextSearchValue);
    });
    expect(tree.find(SearchState).emitted()['update:value'][0][0]).toBe(nextSearchValue);

    expect(changeSearchValue.mock.calls[0][0])
      .toEqual(defaultSearchValue);
    expect(changeSearchValue.mock.calls[0][1])
      .toEqual(nextSearchValue);
  });
});

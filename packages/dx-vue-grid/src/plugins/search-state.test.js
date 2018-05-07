import { mount } from '@vue/test-utils';
import { DxPluginHost } from '@devexpress/dx-vue-core';
import { changeSearchValue, searchFilterExpression } from '@devexpress/dx-grid-core';
import { PluginDepsToComponents, getComputedState, executeComputedAction } from './test-utils';
import { DxSearchState } from './search-state';

jest.mock('@devexpress/dx-grid-core', () => ({
  changeSearchValue: jest.fn(),
  searchFilterExpression: jest.fn().mockReturnValue('filters'),
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
          <DxPluginHost>
            <PluginDepsToComponents deps={{}} />
            <DxSearchState
              value={searchValue}
            />
          </DxPluginHost>
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
          <DxPluginHost>
            <PluginDepsToComponents deps={{}} />
            <DxSearchState
              value={searchValue}
            />
          </DxPluginHost>
        );
      },
    });

    expect(searchFilterExpression)
      .toBeCalled();
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
          <DxPluginHost>
            <PluginDepsToComponents deps={{}} />
            <DxSearchState
              value={defaultSearchValue}
            />
          </DxPluginHost>
        );
      },
    });

    executeComputedAction(tree, (actions) => {
      actions.changeSearchValue(nextSearchValue);
    });
    expect(tree.find(DxSearchState).emitted()['update:value'][0][0]).toBe(nextSearchValue);

    expect(changeSearchValue.mock.calls[0][0])
      .toEqual(defaultSearchValue);
    expect(changeSearchValue.mock.calls[0][1])
      .toEqual(nextSearchValue);
  });
});

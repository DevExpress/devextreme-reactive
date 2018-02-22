import * as React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import { changeSearchValue } from '@devexpress/dx-grid-core';
import { pluginDepsToComponents, getComputedState, executeComputedAction } from './test-utils';
import { SearchState } from './search-state';

jest.mock('@devexpress/dx-grid-core', () => ({
  changeSearchValue: jest.fn(),
  pushSearchFilterExpression: jest.fn().mockImplementation(() => jest.fn().mockReturnValue('filters')),
}));

const defaultDeps = {
  getter: {
    rows: [{ id: 1 }],
    columns: [{ name: 'a' }, { name: 'b' }],
  },
};

describe('Search state', () => {
  let resetConsole;

  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    changeSearchValue.mockImplementation(() => []);
  });

  it('should provide searchValue defined in defaultSearchValue property', () => {
    const defaultSearchValue = 'abc';

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <SearchState
          defaultSearchValue={defaultSearchValue}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).searchValue)
      .toBe(defaultSearchValue);
  });

  it('should provide searchValue defined in searchValue property', () => {
    const searchValue = 'abc';

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <SearchState
          searchValue={searchValue}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).searchValue)
      .toBe(searchValue);
  });

  it('should fire the "onSearchValueChange" callback and should change searchValue in uncontrolled mode after the "changeSearchValue" action is fired', () => {
    const defaultSearchValue = 'abc';
    const newSearchValue = 'xyz';

    const searchChange = jest.fn();
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <SearchState
          defaultSearchValue={defaultSearchValue}
          onSearchValueChange={searchChange}
        />
      </PluginHost>
    ));

    const payload = { searchValue: newSearchValue };
    changeSearchValue.mockReturnValue(newSearchValue);
    executeComputedAction(tree, actions => actions.changeSearchValue(payload));

    expect(changeSearchValue)
      .toBeCalledWith(defaultSearchValue, payload);

    expect(getComputedState(tree).searchValue)
      .toBe(newSearchValue);

    expect(searchChange)
      .toBeCalledWith(newSearchValue);
  });

  it('should provide filter expressions', () => {
    const searchValue = 'abc';

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <SearchState
          searchValue={searchValue}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).filterExpression).toBe('filters');
  });

  it('should correctly work with the several action calls in the uncontrolled mode', () => {
    const defaultSearchValue = '1';
    const transitionalSearchValue = '2';
    const newSearchValue = '3';
    const payload = {};

    const onSearchValueChange = jest.fn();
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <SearchState
          defaultSearchValue={defaultSearchValue}
          onSearchValueChange={onSearchValueChange}
        />
      </PluginHost>
    ));

    changeSearchValue.mockReturnValueOnce(transitionalSearchValue);
    changeSearchValue.mockReturnValueOnce(newSearchValue);
    executeComputedAction(tree, (actions) => {
      actions.changeSearchValue(payload);
      actions.changeSearchValue(payload);
    });

    expect(changeSearchValue)
      .lastCalledWith(transitionalSearchValue, payload);

    expect(onSearchValueChange)
      .toHaveBeenCalledTimes(1);
  });

  it('should correctly work with the several action calls in the controlled mode', () => {
    const searchValue = '1';
    const transitionalSearchValue = '2';
    const newSearchValue = '3';
    const payload = {};

    const onSearchValueChange = jest.fn();
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <SearchState
          searchValue={searchValue}
          onSearchValueChange={onSearchValueChange}
        />
      </PluginHost>
    ));

    changeSearchValue.mockReturnValueOnce(transitionalSearchValue);
    changeSearchValue.mockReturnValueOnce(newSearchValue);
    executeComputedAction(tree, (actions) => {
      actions.changeSearchValue(payload);
      actions.changeSearchValue(payload);
    });

    expect(changeSearchValue)
      .lastCalledWith(transitionalSearchValue, payload);

    expect(onSearchValueChange)
      .toHaveBeenCalledTimes(1);
  });
});

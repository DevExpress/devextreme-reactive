import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import { changeSearchValue } from '@devexpress/dx-grid-core';
import { pluginDepsToComponents, getComputedState, executeComputedAction } from './test-utils';
import { SearchingState } from './searching-state';

jest.mock('@devexpress/dx-grid-core', () => ({
  changeSearchValue: jest.fn(),
}));

const defaultDeps = {
  getter: {
    rows: [{ id: 1 }],
  },
};

describe('Searching state', () => {
  let resetConsole;

  beforeAll(() => {
    resetConsole = setupConsole();
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    changeSearchValue.mockImplementation(() => []);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should provide searchValue defined in defaultSearchValue property', () => {
    const defaultSearchValue = 'abc';

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <SearchingState
          defaultSearchValue={defaultSearchValue}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).searchValue)
      .toBe(defaultSearchValue);
  });

  it('should provide filters defined in filters property', () => {
    const searchValue = 'abc';

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <SearchingState
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
        <SearchingState
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
});

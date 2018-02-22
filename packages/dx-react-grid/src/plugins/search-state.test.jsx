import * as React from 'react';
import { mount } from 'enzyme';
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

  it.only('should provide searchValue defined in defaultValue property', () => {
    const defaultValue = 'abc';

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <SearchState
          defaultValue={defaultValue}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).searchValue)
      .toBe(defaultValue);
  });

  it('should provide value defined in value property', () => {
    const value = 'abc';

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <SearchState
          value={value}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).value)
      .toBe(value);
  });

  it('should fire the "onValueChange" callback and should change value in uncontrolled mode after the "changeSearchValue" action is fired', () => {
    const defaultValue = 'abc';
    const newValue = 'xyz';

    const searchChange = jest.fn();
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <SearchState
          defaultValue={defaultValue}
          onValueChange={searchChange}
        />
      </PluginHost>
    ));

    const payload = { value: newValue };
    changeSearchValue.mockReturnValue(newValue);
    executeComputedAction(tree, actions => actions.changeSearchValue(payload));

    expect(changeSearchValue)
      .toBeCalledWith(defaultValue, payload);

    expect(getComputedState(tree).value)
      .toBe(newValue);

    expect(searchChange)
      .toBeCalledWith(newValue);
  });

  it('should provide filter expressions', () => {
    const value = 'abc';

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <SearchState
          value={value}
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
          defaultValue={defaultSearchValue}
          onValueChange={onSearchValueChange}
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
          value={searchValue}
          onValueChange={onSearchValueChange}
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

import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  setColumnSorting,
} from '@devexpress/dx-grid-core';
import { pluginDepsToComponents, getComputedState } from './test-utils';
import { SortingState } from './sorting-state';

jest.mock('@devexpress/dx-grid-core', () => ({
  setColumnSorting: jest.fn(),
}));

const defaultDeps = {
  getter: {
    rows: [{ id: 1 }],
    getRowId: row => row.id,
  },
};

describe('SortingState', () => {
  let resetConsole;

  beforeAll(() => {
    resetConsole = setupConsole();
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    setColumnSorting.mockImplementation(() => ({}));
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should provide sorting defined in defaultSorting property', () => {
    const defaultSorting = [{ columnName: 'a', direction: 'asc' }];

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <SortingState
          defaultSorting={defaultSorting}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).getters.sorting)
      .toBe(defaultSorting);
  });

  it('should provide sorting defined in sorting property', () => {
    const sorting = [{ columnName: 'a', direction: 'asc' }];

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <SortingState
          sorting={sorting}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).getters.sorting)
      .toBe(sorting);
  });

  it('should fire the "onSortingChange" callback and should change sorting in uncontrolled mode after the "setColumnSorting" action is fired', () => {
    const defaultSorting = [{ columnName: 'a', direction: 'asc' }];
    const newSorting = [{ columnName: 'b', direction: 'asc' }];

    const sortingChange = jest.fn();
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <SortingState
          defaultSorting={defaultSorting}
          onSortingChange={sortingChange}
        />
      </PluginHost>
    ));

    const payload = {};
    setColumnSorting.mockReturnValue({ sorting: newSorting });
    getComputedState(tree).actions.setColumnSorting(payload);

    expect(setColumnSorting)
      .toBeCalledWith(expect.objectContaining({ sorting: defaultSorting }), payload);

    expect(getComputedState(tree).getters.sorting)
      .toBe(newSorting);

    expect(sortingChange)
      .toBeCalledWith(newSorting);
  });

  it('should fire the "onSortingChange" callback and should change sorting in controlled mode after the "setColumnSorting" action is fired', () => {
    const sorting = [{ columnName: 'a', direction: 'asc' }];
    const newSorting = [{ columnName: 'b', direction: 'asc' }];

    const sortingChange = jest.fn();
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <SortingState
          sorting={sorting}
          onSortingChange={sortingChange}
        />
      </PluginHost>
    ));

    const payload = {};
    setColumnSorting.mockReturnValue({ sorting: newSorting });
    getComputedState(tree).actions.setColumnSorting(payload);

    expect(setColumnSorting)
      .toBeCalledWith(expect.objectContaining({ sorting }), payload);

    expect(getComputedState(tree).getters.sorting)
      .toBe(sorting);

    expect(sortingChange)
      .toBeCalledWith(newSorting);
  });
});

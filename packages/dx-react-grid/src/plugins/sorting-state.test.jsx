import * as React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import { changeColumnSorting } from '@devexpress/dx-grid-core';
import { pluginDepsToComponents, getComputedState, executeComputedAction } from './test-utils';
import { SortingState } from './sorting-state';

jest.mock('@devexpress/dx-grid-core', () => ({
  changeColumnSorting: jest.fn(),
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
    changeColumnSorting.mockImplementation(() => ({}));
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

    expect(getComputedState(tree).sorting)
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

    expect(getComputedState(tree).sorting)
      .toBe(sorting);
  });

  it('should fire the "onSortingChange" callback and should change sorting in uncontrolled mode after the "changeColumnSorting" action is fired', () => {
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
    changeColumnSorting.mockReturnValue({ sorting: newSorting });
    executeComputedAction(tree, actions => actions.changeColumnSorting(payload));

    expect(changeColumnSorting)
      .toBeCalledWith(expect.objectContaining({ sorting: defaultSorting }), payload);

    expect(getComputedState(tree).sorting)
      .toBe(newSorting);

    expect(sortingChange)
      .toBeCalledWith(newSorting);
  });

  it('should fire the "onSortingChange" callback and should change sorting in controlled mode after the "changeColumnSorting" action is fired', () => {
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
    changeColumnSorting.mockReturnValue({ sorting: newSorting });
    executeComputedAction(tree, actions => actions.changeColumnSorting(payload));

    expect(changeColumnSorting)
      .toBeCalledWith(expect.objectContaining({ sorting }), payload);

    expect(getComputedState(tree).sorting)
      .toBe(sorting);

    expect(sortingChange)
      .toBeCalledWith(newSorting);
  });

  describe('action sequence in batch', () => {
    it('should correctly work with the several action calls in the uncontrolled mode', () => {
      const defaultSorting = [1];
      const transitionalSorting = [2];
      const newSorting = [3];
      const payload = {};

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

      changeColumnSorting.mockReturnValueOnce({ sorting: transitionalSorting });
      changeColumnSorting.mockReturnValueOnce({ sorting: newSorting });
      executeComputedAction(tree, (actions) => {
        actions.changeColumnSorting(payload);
        actions.changeColumnSorting(payload);
      });

      expect(changeColumnSorting)
        .lastCalledWith(
          expect.objectContaining({ sorting: transitionalSorting }),
          payload,
        );

      expect(sortingChange)
        .toHaveBeenCalledTimes(1);
    });

    it('should correctly work with the several action calls in the controlled mode', () => {
      const sorting = [1];
      const transitionalSorting = [2];
      const newSorting = [3];
      const payload = {};

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

      changeColumnSorting.mockReturnValueOnce({ sorting: transitionalSorting });
      changeColumnSorting.mockReturnValueOnce({ sorting: newSorting });
      executeComputedAction(tree, (actions) => {
        actions.changeColumnSorting(payload);
        actions.changeColumnSorting(payload);
      });

      expect(changeColumnSorting)
        .lastCalledWith(
          expect.objectContaining({ sorting: transitionalSorting }),
          payload,
        );

      expect(sortingChange)
        .toHaveBeenCalledTimes(1);
    });
  });
});

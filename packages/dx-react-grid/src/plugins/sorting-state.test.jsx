import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import { changeColumnSorting, getColumnExtension } from '@devexpress/dx-grid-core';
import { pluginDepsToComponents, getComputedState, executeComputedAction } from './test-utils';
import { SortingState } from './sorting-state';

jest.mock('@devexpress/dx-grid-core', () => ({
  changeColumnSorting: jest.fn(),
  getColumnExtension: jest.fn(),
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

  describe('column extensions', () => {
    beforeEach(() => {
      getColumnExtension.mockImplementation(() => ({}));
    });
    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should allow sorting by default', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <SortingState />
        </PluginHost>
      ));

      expect(getComputedState(tree).columnSortingEnabled('a'))
        .toBeTruthy();
    });

    it('should not allow sorting if sortable prop is false', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <SortingState
            sortable={false}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).columnSortingEnabled('a'))
        .toBeFalsy();
    });

    it('should allow sorting if sortable prop is false and sortable extension is true', () => {
      const columnExtension = { columnName: 'a', sortable: true };
      getColumnExtension.mockReturnValue(columnExtension);
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <SortingState
            sortable={false}
            columnExtensions={[columnExtension]}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).columnSortingEnabled('a'))
        .toBeTruthy();
    });

    it('should not allow sorting if sortable extension is false', () => {
      const columnExtension = { columnName: 'a', sortable: false };
      getColumnExtension.mockReturnValue(columnExtension);
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <SortingState
            columnExtensions={[columnExtension]}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).columnSortingEnabled('a'))
        .toBeFalsy();
    });
  });
});

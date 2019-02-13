import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState, setupConsole } from '@devexpress/dx-testing';
import {
  paginatedRows, rowsWithPageHeaders, currentPage, rowCount,
} from '@devexpress/dx-grid-core';
import { PluginHost } from '@devexpress/dx-react-core';
import { IntegratedPaging } from './integrated-paging';

jest.mock('@devexpress/dx-grid-core', () => ({
  paginatedRows: jest.fn(),
  rowsWithPageHeaders: jest.fn(),
  rowCount: jest.fn(),
  currentPage: jest.fn(),
}));

const defaultDeps = {
  getter: {
    rows: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
    currentPage: 1,
    pageSize: 2,
    getRowLevelKey: () => null,
  },
  action: {
    setCurrentPage: jest.fn(),
  },
  plugins: ['PagingState'],
};

describe('IntegratedPaging', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    paginatedRows.mockImplementation(() => [{ id: 2 }, { id: 3 }]);
    rowCount.mockImplementation(() => 6);
    currentPage.mockImplementation(() => {});
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should provide totalCount of rows passed into', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <IntegratedPaging />
      </PluginHost>
    ));

    expect(getComputedState(tree).totalCount)
      .toBe(6);
  });

  it('should paginated rows passed into based on the "currentPage" and "pageSize" getters', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <IntegratedPaging />
      </PluginHost>
    ));

    expect(getComputedState(tree).rows)
      .toEqual([{ id: 2 }, { id: 3 }]);
  });

  it('should ensure page headers are present on each page', () => {
    const deps = {};
    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, deps)}
        <IntegratedPaging />
      </PluginHost>
    ));

    expect(rowsWithPageHeaders)
      .toHaveBeenCalledWith(
        defaultDeps.getter.rows,
        defaultDeps.getter.pageSize,
        defaultDeps.getter.getRowLevelKey,
      );
  });
});

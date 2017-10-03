import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { paginatedGridRows, gridRowsWithPageHeaders, pageCount, gridRowsCount } from '@devexpress/dx-grid-core';
import { PluginHost } from '@devexpress/dx-react-core';
import { LocalPaging } from './local-paging';
import { pluginDepsToComponents, getComputedState } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  paginatedGridRows: jest.fn(),
  gridRowsWithPageHeaders: jest.fn(),
  pageCount: jest.fn(),
  gridRowsCount: jest.fn(),
}));

const defaultDeps = {
  getter: {
    gridRows: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
    currentPage: 1,
    pageSize: 2,
  },
  action: {
    setCurrentPage: jest.fn(),
  },
  plugins: ['PagingState'],
};

describe('LocalPaging', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    paginatedGridRows.mockImplementation(() => [{ id: 2 }, { id: 3 }]);
    pageCount.mockImplementation(() => 3);
    gridRowsCount.mockImplementation(() => 6);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should provide totalCount of gridRows passed into', () => {
    const tree = mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <LocalPaging />
      </PluginHost>,
    );

    expect(getComputedState(tree).getters.totalCount)
      .toBe(6);
  });

  it('should paginatedGridRows gridRows passed into based on the "currentPage" and "pageSize" getters', () => {
    const tree = mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <LocalPaging />
      </PluginHost>,
    );

    expect(getComputedState(tree).getters.gridRows)
      .toEqual([{ id: 2 }, { id: 3 }]);
  });

  it('should change the "currentPage" if starting row index exceeds the gridRows count', () => {
    const deps = {
      getter: {
        currentPage: 4,
      },
    };
    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, deps)}
        <LocalPaging />
      </PluginHost>,
    );

    expect(defaultDeps.action.setCurrentPage.mock.calls)
      .toEqual([[2]]);
  });

  it('should ensure page headers are present on each page', () => {
    const deps = {};
    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, deps)}
        <LocalPaging />
      </PluginHost>,
    );

    expect(gridRowsWithPageHeaders)
      .toHaveBeenCalledWith(defaultDeps.getter.gridRows, defaultDeps.getter.pageSize);
  });
});

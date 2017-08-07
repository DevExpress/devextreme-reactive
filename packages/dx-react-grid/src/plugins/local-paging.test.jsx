import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { paginate, ensurePageHeaders, pageCount, rowCount } from '@devexpress/dx-grid-core';
import { Template, PluginHost } from '@devexpress/dx-react-core';
import { LocalPaging } from './local-paging';
import { pluginDepsToComponents } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  paginate: jest.fn(),
  ensurePageHeaders: jest.fn(),
  pageCount: jest.fn(),
  rowCount: jest.fn(),
}));

const defaultDeps = {
  getter: {
    rows: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
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
    paginate.mockImplementation(() => [{ id: 2 }, { id: 3 }]);
    pageCount.mockImplementation(() => 3);
    rowCount.mockImplementation(() => 6);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should provide totalCount of rows passed into', () => {
    let totalCount;
    const deps = {};
    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, deps)}
        <LocalPaging />
        <Template
          name="root"
          connectGetters={(getter) => { totalCount = getter('totalCount'); }}
        >
          {() => <div />}
        </Template>
      </PluginHost>,
    );

    expect(totalCount)
      .toBe(6);
  });

  it('should paginate rows passed into based on the "currentPage" and "pageSize" getters', () => {
    let paginatedRows;
    const deps = {};
    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, deps)}
        <LocalPaging />
        <Template
          name="root"
          connectGetters={(getter) => { paginatedRows = getter('rows'); }}
        >
          {() => <div />}
        </Template>
      </PluginHost>,
    );

    expect(paginatedRows)
      .toEqual([{ id: 2 }, { id: 3 }]);
  });

  it('should change the "currentPage" if starting row index exceeds the rows count', () => {
    const deps = {
      getter: {
        currentPage: 4,
      },
    };
    mount(
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, deps)}
        <LocalPaging />
        <Template
          name="root"
          connectGetters={getter => (getter('rows'))}
        >
          {() => <div />}
        </Template>
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

    expect(ensurePageHeaders)
      .toHaveBeenCalledWith(defaultDeps.getter.rows, defaultDeps.getter.pageSize);
  });
});

import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { pageCount, getMessagesFormatter } from '@devexpress/dx-grid-core';
import { PluginHost } from '@devexpress/dx-react-core';
import { PagingPanel } from './paging-panel';
import { pluginDepsToComponents } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  pageCount: jest.fn(),
  getMessagesFormatter: jest.fn(),
}));

const defaultDeps = {
  getter: {
    currentPage: 1,
    pageSize: 2,
    totalCount: 21,
  },
  action: {
    setCurrentPage: jest.fn(),
    setPageSize: jest.fn(),
  },
  template: {
    footer: {},
  },
  plugins: ['PagingState'],
};

describe('PagingPanel', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    pageCount.mockImplementation(() => 11);
    getMessagesFormatter.mockImplementation(messages => key => (messages[key] || key));
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render the "pagerTemplate" template in the "footer" template placeholder', () => {
    const pagerTemplate = jest.fn().mockReturnValue(null);
    const deps = {};

    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, deps)}
        <PagingPanel
          pagerTemplate={pagerTemplate}
          allowedPageSizes={[3, 5, 0]}
        />
      </PluginHost>
    ));

    expect(pagerTemplate.mock.calls[0][0])
      .toMatchObject({
        currentPage: 1,
        pageSize: 2,
        totalCount: 21,
        totalPages: 11,
        allowedPageSizes: [3, 5, 0],
      });

    pagerTemplate.mock.calls[0][0].onCurrentPageChange(3);
    expect(defaultDeps.action.setCurrentPage.mock.calls[0][0])
      .toEqual(3);
  });

  it('should pass correct getMessage prop to pagerTemplate', () => {
    const pagerTemplate = jest.fn().mockReturnValue(null);
    const deps = {};
    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, deps)}
        <PagingPanel
          pagerTemplate={pagerTemplate}
          messages={{
            showAll: 'Show all',
          }}
        />
      </PluginHost>
    ));

    const { getMessage } = pagerTemplate.mock.calls[0][0];

    expect(getMessage('showAll')).toBe('Show all');
  });
});

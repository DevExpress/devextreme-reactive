import React from 'react';
import { mount } from 'enzyme';

import { setupConsole } from '@devexpress/dx-testing';
import {
  Template, TemplatePlaceholder,
  PluginHost, Getter, Action,
} from '@devexpress/dx-react-core';

import { PagingPanel } from './paging-panel';

describe('PagingPanel', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  it('should render the "pagerTemplate" template in the "footer" template placeholder', () => {
    const pagerTemplateMock = jest.fn().mockReturnValue(null);
    const setCurrentPageMock = jest.fn();
    const setPageSizeMock = jest.fn();

    mount(
      <PluginHost>
        <Template name="root">
          <TemplatePlaceholder
            name="footer"
          />
        </Template>

        <Getter name="currentPage" value={1} />
        <Getter name="pageSize" value={2} />
        <Getter name="totalCount" value={21} />

        <Action name="setCurrentPage" action={setCurrentPageMock} />
        <Action name="setPageSize" action={setPageSizeMock} />

        <PagingPanel
          pagerTemplate={pagerTemplateMock}
          allowedPageSizes={[3, 5, 0]}
        />
      </PluginHost>,
    );

    expect(pagerTemplateMock.mock.calls[0][0])
      .toMatchObject({
        currentPage: 1,
        pageSize: 2,
        totalCount: 21,
        totalPages: 11,
        allowedPageSizes: [3, 5, 0],
      });

    pagerTemplateMock.mock.calls[0][0].onCurrentPageChange(3);
    expect(setCurrentPageMock.mock.calls)
      .toEqual([[{ page: 3 }]]);

    pagerTemplateMock.mock.calls[0][0].onPageSizeChange(3);
    expect(setPageSizeMock.mock.calls)
      .toEqual([[{ size: 3 }]]);
  });
});

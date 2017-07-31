import React from 'react';
import { mount } from 'enzyme';

import { setupConsole } from '@devexpress/dx-testing';
import { Template, Getter, Action, PluginHost } from '@devexpress/dx-react-core';

import { LocalPaging } from './local-paging';

describe('LocalPaging', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  it('should provide totalCount of rows passed into', () => {
    let totalCount;
    mount(
      <PluginHost>
        <Getter
          name="rows"
          value={[{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]}
        />
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
    mount(
      <PluginHost>
        <Getter
          name="rows"
          value={[{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]}
        />
        <Getter name="currentPage" value={1} />
        <Getter name="pageSize" value={2} />
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

  it('should change the "currentPage" if starting row index exeeds the rows count', () => {
    const setCurrentPageMock = jest.fn();
    mount(
      <PluginHost>
        <Getter
          name="rows"
          value={[{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]}
        />
        <Getter name="currentPage" value={4} />
        <Getter name="pageSize" value={2} />
        <Action name="setCurrentPage" action={setCurrentPageMock} />
        <LocalPaging />
        <Template
          name="root"
          connectGetters={getter => (getter('rows'))}
        >
          {() => <div />}
        </Template>
      </PluginHost>,
    );

    expect(setCurrentPageMock.mock.calls)
      .toEqual([[{ page: 2 }]]);
  });

  it('should ensure page headers are present on each page', () => {
    let paginatedRows;
    let totalCount;
    mount(
      <PluginHost>
        <Getter
          name="rows"
          value={[{ id: 0, _headerKey: 'a' }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]}
        />
        <Getter name="currentPage" value={1} />
        <Getter name="pageSize" value={2} />
        <LocalPaging />
        <Template
          name="root"
          connectGetters={(getter) => {
            paginatedRows = getter('rows');
            totalCount = getter('totalCount');
          }}
        >
          {() => <div />}
        </Template>
      </PluginHost>,
    );

    expect(paginatedRows)
      .toEqual([{ id: 0, _headerKey: 'a' }, { id: 2 }]);
    expect(totalCount)
      .toEqual(10);
  });
});

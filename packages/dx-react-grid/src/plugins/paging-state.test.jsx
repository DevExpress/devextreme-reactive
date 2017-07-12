import React from 'react';
import { mount } from 'enzyme';

import { setupConsole } from '@devexpress/dx-testing';
import { Template, PluginHost } from '@devexpress/dx-react-core';

import { PagingState } from './paging-state';

describe('PagingState', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  describe('current page', () => {
    it('should provide value from the "defaultCurrentPage" property in uncontrolled mode', () => {
      let currentPage;
      mount(
        <PluginHost>
          <PagingState
            defaultCurrentPage={2}
          />
          <Template
            name="root"
            connectGetters={getter => (currentPage = getter('currentPage'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      expect(currentPage)
        .toBe(2);
    });

    it('should provide value from the "currentPage" property in controlled mode', () => {
      let currentPage;
      mount(
        <PluginHost>
          <PagingState
            currentPage={3}
          />
          <Template
            name="root"
            connectGetters={getter => (currentPage = getter('currentPage'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      expect(currentPage)
        .toBe(3);
    });

    it('should fire the "onCurrentPageChange" callback and provide new value in uncontrolled mode after the "setCurrentPage" action is fired', () => {
      const currentPageChangeMock = jest.fn();
      let currentPage;
      let setCurrentPage;
      mount(
        <PluginHost>
          <PagingState
            defaultCurrentPage={2}
            onCurrentPageChange={currentPageChangeMock}
          />
          <Template
            name="root"
            connectGetters={getter => (currentPage = getter('currentPage'))}
            connectActions={action => (setCurrentPage = action('setCurrentPage'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      setCurrentPage({ page: 3 });

      expect(currentPage)
        .toEqual(3);
      expect(currentPageChangeMock.mock.calls[0][0])
        .toEqual(3);
    });

    it('should fire the "onCurrentPageChange" callback and provide value from the "currentPage" property in controlled mode after the "setCurrentPage" action is fired', () => {
      const currentPageChangeMock = jest.fn();
      let currentPage;
      let setCurrentPage;
      mount(
        <PluginHost>
          <PagingState
            currentPage={2}
            onCurrentPageChange={currentPageChangeMock}
          />
          <Template
            name="root"
            connectGetters={getter => (currentPage = getter('currentPage'))}
            connectActions={action => (setCurrentPage = action('setCurrentPage'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      setCurrentPage({ page: 3 });

      expect(currentPage)
        .toEqual(2);
      expect(currentPageChangeMock.mock.calls[0][0])
        .toEqual(3);
    });
  });

  describe('page size', () => {
    it('should provide value from the "defaultPageSize" property in uncontrolled mode', () => {
      let pageSize;
      mount(
        <PluginHost>
          <PagingState
            defaultPageSize={2}
          />
          <Template
            name="root"
            connectGetters={getter => (pageSize = getter('pageSize'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      expect(pageSize)
        .toBe(2);
    });

    it('should provide value from the "pageSize" property in controlled mode', () => {
      let pageSize;
      mount(
        <PluginHost>
          <PagingState
            pageSize={3}
          />
          <Template
            name="root"
            connectGetters={getter => (pageSize = getter('pageSize'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      expect(pageSize)
        .toBe(3);
    });

    it('should fire the "onPageSizeChange" callback and provide new value in uncontrolled mode after the "setPageSize" action is fired', () => {
      const pageSizeChangeMock = jest.fn();
      let pageSize;
      let setPageSize;
      mount(
        <PluginHost>
          <PagingState
            defaultPageSize={2}
            onPageSizeChange={pageSizeChangeMock}
          />
          <Template
            name="root"
            connectGetters={getter => (pageSize = getter('pageSize'))}
            connectActions={action => (setPageSize = action('setPageSize'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      setPageSize({ size: 3 });

      expect(pageSize)
        .toEqual(3);
      expect(pageSizeChangeMock.mock.calls[0][0])
        .toEqual(3);
    });

    it('should fire the "onPageSizeChange" callback and provide value from the "pageSize" property in controlled mode after the "setPageSize" action is fired', () => {
      const pageSizeChangeMock = jest.fn();
      let pageSize;
      let setPageSize;
      mount(
        <PluginHost>
          <PagingState
            pageSize={2}
            onPageSizeChange={pageSizeChangeMock}
          />
          <Template
            name="root"
            connectGetters={getter => (pageSize = getter('pageSize'))}
            connectActions={action => (setPageSize = action('setPageSize'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      setPageSize({ size: 3 });

      expect(pageSize)
        .toEqual(2);
      expect(pageSizeChangeMock.mock.calls[0][0])
        .toEqual(3);
    });
  });

  describe('total count', () => {
    it('should provide value from the "totalCount" property', () => {
      let totalCount;
      mount(
        <PluginHost>
          <PagingState
            totalCount={100}
          />
          <Template
            name="root"
            connectGetters={getter => (totalCount = getter('totalCount'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      expect(totalCount)
        .toBe(100);
    });

    it('should provide \'0\' if a value for the "totalCount" property undefined', () => {
      let totalCount;
      mount(
        <PluginHost>
          <PagingState />
          <Template
            name="root"
            connectGetters={getter => (totalCount = getter('totalCount'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      expect(totalCount)
        .toBe(0);
    });
  });
});

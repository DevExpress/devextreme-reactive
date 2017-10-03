import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from './test-utils';

import { PagingState } from './paging-state';

const defaultDeps = {};

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
      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <PagingState
            defaultCurrentPage={2}
          />
        </PluginHost>,
      );

      expect(getComputedState(tree).getters.currentPage)
        .toBe(2);
    });

    it('should provide value from the "currentPage" property in controlled mode', () => {
      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <PagingState
            currentPage={3}
          />
        </PluginHost>,
      );

      expect(getComputedState(tree).getters.currentPage)
        .toBe(3);
    });

    it('should fire the "onCurrentPageChange" callback and provide new value in uncontrolled mode after the "setCurrentPage" action is fired', () => {
      const currentPageChangeMock = jest.fn();

      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <PagingState
            defaultCurrentPage={2}
            onCurrentPageChange={currentPageChangeMock}
          />
        </PluginHost>,
      );

      getComputedState(tree).actions.setCurrentPage(3);

      expect(getComputedState(tree).getters.currentPage)
        .toEqual(3);
      expect(currentPageChangeMock)
        .toBeCalledWith(3);
    });

    it('should fire the "onCurrentPageChange" callback and provide value from the "currentPage" property in controlled mode after the "setCurrentPage" action is fired', () => {
      const currentPageChangeMock = jest.fn();

      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <PagingState
            currentPage={2}
            onCurrentPageChange={currentPageChangeMock}
          />
        </PluginHost>,
      );

      getComputedState(tree).actions.setCurrentPage(3);

      expect(getComputedState(tree).getters.currentPage)
        .toEqual(2);
      expect(currentPageChangeMock)
        .toBeCalledWith(3);
    });
  });

  describe('page size', () => {
    it('should provide value from the "defaultPageSize" property in uncontrolled mode', () => {
      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <PagingState
            defaultPageSize={2}
          />
        </PluginHost>,
      );

      expect(getComputedState(tree).getters.pageSize)
        .toBe(2);
    });

    it('should provide value from the "pageSize" property in controlled mode', () => {
      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <PagingState
            pageSize={2}
          />
        </PluginHost>,
      );

      expect(getComputedState(tree).getters.pageSize)
        .toBe(2);
    });

    it('should fire the "onPageSizeChange" callback and provide new value in uncontrolled mode after the "setPageSize" action is fired', () => {
      const pageSizeChangeMock = jest.fn();

      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <PagingState
            defaultPageSize={2}
            onPageSizeChange={pageSizeChangeMock}
          />
        </PluginHost>,
      );

      getComputedState(tree).actions.setPageSize(3);

      expect(getComputedState(tree).getters.pageSize)
        .toEqual(3);
      expect(pageSizeChangeMock)
        .toBeCalledWith(3);
    });

    it('should fire the "onPageSizeChange" callback and provide value from the "pageSize" property in controlled mode after the "setPageSize" action is fired', () => {
      const pageSizeChangeMock = jest.fn();

      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <PagingState
            pageSize={2}
            onPageSizeChange={pageSizeChangeMock}
          />
        </PluginHost>,
      );

      getComputedState(tree).actions.setPageSize(3);

      expect(getComputedState(tree).getters.pageSize)
        .toEqual(2);
      expect(pageSizeChangeMock)
        .toBeCalledWith(3);
    });
  });

  describe('total count', () => {
    it('should provide value from the "totalCount" property', () => {
      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <PagingState
            totalCount={100}
          />
        </PluginHost>,
      );

      expect(getComputedState(tree).getters.totalCount)
        .toBe(100);
    });

    it('should provide \'0\' if a value for the "totalCount" property undefined', () => {
      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <PagingState />
        </PluginHost>,
      );

      expect(getComputedState(tree).getters.totalCount)
        .toBe(0);
    });
  });
});

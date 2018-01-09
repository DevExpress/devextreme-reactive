import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState, executeComputedAction } from './test-utils';

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
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <PagingState
            defaultCurrentPage={2}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).currentPage)
        .toBe(2);
    });

    it('should provide value from the "currentPage" property in controlled mode', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <PagingState
            currentPage={3}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).currentPage)
        .toBe(3);
    });

    it('should fire the "onCurrentPageChange" callback and provide new value in uncontrolled mode after the "setCurrentPage" action is fired', () => {
      const currentPageChangeMock = jest.fn();

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <PagingState
            defaultCurrentPage={2}
            onCurrentPageChange={currentPageChangeMock}
          />
        </PluginHost>
      ));

      executeComputedAction(tree, actions => actions.setCurrentPage(3));

      expect(getComputedState(tree).currentPage)
        .toEqual(3);
      expect(currentPageChangeMock)
        .toBeCalledWith(3);
    });

    it('should fire the "onCurrentPageChange" callback and provide value from the "currentPage" property in controlled mode after the "setCurrentPage" action is fired', () => {
      const currentPageChangeMock = jest.fn();

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <PagingState
            currentPage={2}
            onCurrentPageChange={currentPageChangeMock}
          />
        </PluginHost>
      ));

      executeComputedAction(tree, actions => actions.setCurrentPage(3));

      expect(getComputedState(tree).currentPage)
        .toEqual(2);
      expect(currentPageChangeMock)
        .toBeCalledWith(3);
    });
  });

  describe('page size', () => {
    it('should provide value from the "defaultPageSize" property in uncontrolled mode', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <PagingState
            defaultPageSize={2}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).pageSize)
        .toBe(2);
    });

    it('should provide value from the "pageSize" property in controlled mode', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <PagingState
            pageSize={2}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).pageSize)
        .toBe(2);
    });

    it('should fire the "onPageSizeChange" callback and provide new value in uncontrolled mode after the "setPageSize" action is fired', () => {
      const pageSizeChangeMock = jest.fn();

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <PagingState
            defaultPageSize={2}
            onPageSizeChange={pageSizeChangeMock}
          />
        </PluginHost>
      ));

      executeComputedAction(tree, actions => actions.setPageSize(3));

      expect(getComputedState(tree).pageSize)
        .toEqual(3);
      expect(pageSizeChangeMock)
        .toBeCalledWith(3);
    });

    it('should fire the "onPageSizeChange" callback and provide value from the "pageSize" property in controlled mode after the "setPageSize" action is fired', () => {
      const pageSizeChangeMock = jest.fn();

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <PagingState
            pageSize={2}
            onPageSizeChange={pageSizeChangeMock}
          />
        </PluginHost>
      ));

      executeComputedAction(tree, actions => actions.setPageSize(3));

      expect(getComputedState(tree).pageSize)
        .toEqual(2);
      expect(pageSizeChangeMock)
        .toBeCalledWith(3);
    });
  });

  describe('action sequence in batch', () => {
    it('should correctly work with the several action calls in the uncontrolled mode', () => {
      const currentPageChange = jest.fn();
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <PagingState
            defaultCurrentPage={2}
            onCurrentPageChange={currentPageChange}
          />
        </PluginHost>
      ));

      executeComputedAction(tree, (actions) => {
        actions.setCurrentPage(3);
        actions.setCurrentPage(4);
      });

      expect(currentPageChange)
        .toBeCalledWith(4);

      expect(currentPageChange)
        .toHaveBeenCalledTimes(1);
    });

    it('should correctly work with the several action calls in the controlled mode', () => {
      const currentPageChange = jest.fn();
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <PagingState
            currentPage={2}
            onCurrentPageChange={currentPageChange}
          />
        </PluginHost>
      ));

      executeComputedAction(tree, (actions) => {
        actions.setCurrentPage(3);
        actions.setCurrentPage(4);
      });

      expect(currentPageChange)
        .toBeCalledWith(4);

      expect(currentPageChange)
        .toHaveBeenCalledTimes(1);
    });
  });
});

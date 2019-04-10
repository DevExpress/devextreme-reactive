import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { RemoteDataLoader } from './remote-data-loader';
import { pluginDepsToComponents, executeComputedAction } from '@devexpress/dx-testing';
import { nextPageReferenceIndex } from '@devexpress/dx-grid-core';

jest.mock('@devexpress/dx-grid-core', () => ({
  nextPageReferenceIndex: jest.fn(),
}));

describe('RemoteDataLoader', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('ensureNextVirtualPage action', () => {
    const createRows = length => Array.from({ length }).map((_, id) => ({ id }));
    const defaultDeps = {
      getter: {
        remoteDataEnabled: true,
        virtualPageSize: 10,
        virtualRows: {
          start: 0,
          rows: createRows(20),
        },
        loadedRowsStart: 0,
      },
      action: {
        requestNextPage: jest.fn(),
      },
    };
    const payload = {
      viewportTop: 400,
      estimatedRowHeight: 20,
      containerHeight: 100,
      visibleRowBoundaries: {
        start: 17,
        end: 27,
        viewportTop: 395,
      },
    };

    it('should not request next page when remote data is disabled', () => {
      const deps = {
        getter: {
          remoteDataEnabled: false,
        },
      };
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <RemoteDataLoader />
        </PluginHost>
      ));

      executeComputedAction(tree, actions => actions.ensureNextVirtualPage(payload));

      expect(defaultDeps.action.requestNextPage)
        .not.toHaveBeenCalled();
    });

    it('should calculate next page reference index', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <RemoteDataLoader />
        </PluginHost>
      ));

      executeComputedAction(tree, actions => actions.ensureNextVirtualPage(payload));

      expect(nextPageReferenceIndex)
        .toHaveBeenCalledWith(
          payload,
          defaultDeps.getter,
        );
    });

    it('should invoke requestNextPage action with correct parameter', () => {
      nextPageReferenceIndex.mockImplementationOnce(() => 'nextPageReferenceIndex');
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <RemoteDataLoader />
        </PluginHost>
      ));

      executeComputedAction(tree, actions => actions.ensureNextVirtualPage(payload));

      expect(defaultDeps.action.requestNextPage.mock.calls[0][0])
        .toEqual('nextPageReferenceIndex');
    });

    it('should not invoke requestNextPage action if reference index is null', () => {
      nextPageReferenceIndex.mockImplementationOnce(() => null);
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <RemoteDataLoader />
        </PluginHost>
      ));

      executeComputedAction(tree, actions => actions.ensureNextVirtualPage(payload));

      expect(defaultDeps.action.requestNextPage)
        .not.toHaveBeenCalled();
    });
  });
});

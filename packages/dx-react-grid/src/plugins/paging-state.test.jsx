import { testStatePluginField, setupConsole } from '@devexpress/dx-testing';
import { setCurrentPage, setPageSize } from '@devexpress/dx-grid-core';
import { PagingState } from './paging-state';

jest.mock('@devexpress/dx-grid-core', () => ({
  setCurrentPage: jest.fn(),
  setPageSize: jest.fn(),
}));

const defaultDeps = {};

describe('PagingState', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  testStatePluginField({
    Plugin: PagingState,
    propertyName: 'currentPage',
    defaultDeps,
    values: [
      0,
      1,
      2,
    ],
    actions: [{
      actionName: 'setCurrentPage',
      reducer: setCurrentPage,
    }],
  });

  testStatePluginField({
    Plugin: PagingState,
    propertyName: 'pageSize',
    defaultDeps,
    values: [
      0,
      1,
      2,
    ],
    actions: [{
      actionName: 'setPageSize',
      reducer: setPageSize,
    }],
  });
});
